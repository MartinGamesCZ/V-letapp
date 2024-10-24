import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Arkis } from 'arkis';
import { DataFormat } from 'arkis/src/types/distro';
import { DSETS } from '../config';
import Category from '../db/entities/Category';
import Place from '../db/entities/Place';
import axios from 'axios';
import PlaceEmbeddings from '../db/entities/PlaceEmbeddings';
import * as pgvector from 'pgvector';

@Injectable()
export class IndexerService {
  arkis: Arkis;
  catalog: any;

  constructor(private readonly dataSource: DataSource) {
    this.arkis = new Arkis('https://open.datakhk.cz/katalog.jsonld');

    this.start();
  }

  async start() {
    await this.dataSource.query('CREATE EXTENSION IF NOT EXISTS vector');
    await this.dataSource.query(
      'CREATE TABLE IF NOT EXISTS place_embeddings (place_id VARCHAR PRIMARY KEY, embeddings vector(768))',
    );

    this.catalog = await this.arkis.catalog();

    for (const dset_id of DSETS) {
      const dset = await this.catalog.dataset(dset_id);

      const category = await this.getCategory(
        dset.data.dcterms.title.cs,
        dset_id,
      );

      const distro = await dset.distros.find(DataFormat.DB);
      const data = await distro.download();

      for (const place of data.features) {
        const name = place.properties.nazev ?? 'No name';
        const id = place.properties.dp_id;
        const lat = place.geometry.coordinates[1];
        const lon = place.geometry.coordinates[0];
        const description = place.properties.popis ?? 'Popis not found';
        const city = place.properties.nazev_obce ?? 'Unknown';

        if (place.geometry.type != 'Point') {
          console.log(
            `[Indexer] Not saving ${name} (${dset_id}), invalid coords`,
          );
          continue;
        }

        await this.savePlace(id, name, description, city, lat, lon, category);
      }
    }

    console.log('---- DONE INDEXING ----');
  }

  async getCategory(name: string, dset_id: string) {
    const repo = this.dataSource.getRepository(Category);

    let category = await repo.findOne({
      where: {
        id: dset_id,
      },
    });

    if (!category) {
      category = new Category();

      category.id = dset_id;
      category.name = name;

      await repo.save(category);

      console.log(`[Indexer] Creating category ${name}`);
    }

    return category;
  }

  async savePlace(
    id: string,
    name: string,
    description: string,
    city: string,
    latitude: number,
    longitude: number,
    category: Category,
  ) {
    const repo = this.dataSource.getRepository(Place);

    const placeExists = await repo.exists({
      where: {
        id: id,
      },
    });

    if (placeExists) return;

    const place = new Place();

    place.id = id;
    place.name = name;
    place.description = description;
    place.latitude = latitude;
    place.longitude = longitude;
    place.city = city;
    place.category = category;

    await repo.save(place);

    const { data } = await axios.post(
      'https://pub0-ami.remardev.com/api/embed',
      {
        model: 'nomic-embed-text',
        input: `${place.name} ${place.description} ${place.city}`,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: process.env.REMARDEV_AI_KEY,
        },
      },
    );

    const embeddingsRepo = this.dataSource.getRepository(PlaceEmbeddings);

    const embeddings = new PlaceEmbeddings();

    embeddings.place_id = id;
    embeddings.embeddings = pgvector.toSql(data.embeddings[0]);

    await embeddingsRepo.save(embeddings);

    console.log(`[Indexer] Creating place ${name} -  ${category.name}`);
  }
}
