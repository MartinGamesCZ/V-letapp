import { Injectable, NotFoundException } from '@nestjs/common';
import Category from '../db/entities/Category';
import { DataSource } from 'typeorm';
import Place from '../db/entities/Place';
import PlaceEmbeddings from '../db/entities/PlaceEmbeddings';
import axios from 'axios';
import * as pgvector from 'pgvector';

@Injectable()
export class IndexService {
  constructor(private readonly dataSource: DataSource) {}

  async getCategories() {
    const repo = this.dataSource.getRepository(Category);

    return await repo.find();
  }

  async getCategoryPlaces(categoryId: string) {
    const catRepo = this.dataSource.getRepository(Category);
    const plcRepo = this.dataSource.getRepository(Place);

    const category = await catRepo.findOne({
      where: {
        id: categoryId,
      },
    });

    if (!category) return new NotFoundException('Category not found');

    const places = await plcRepo.find({
      where: {
        category: category,
      },
      relations: ['category'],
    });

    return places;
  }

  async getMultiplePlaces(ids: string[]) {
    const repo = this.dataSource.getRepository(Place);

    const out: Place[] = [];

    for (const id of ids) {
      const p = await repo.findOne({
        where: {
          id: id,
        },
        relations: ['category'],
      });

      out.push(p);
    }

    return out;
  }

  async searchPlaces(query: string) {
    const repo = this.dataSource.getRepository(Place);

    const { data } = await axios.post(
      'https://pub0-ami.remardev.com/api/embed',
      {
        model: 'nomic-embed-text',
        input: query,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: process.env.REMARDEV_AI_KEY,
        },
      },
    );

    if (!data?.embeddings) return [];

    const items = await this.dataSource
      .createQueryBuilder()
      .select('*')
      .from(PlaceEmbeddings, 'place_embeddings')
      .orderBy('embeddings <-> :embedding')
      .setParameters({
        embedding: pgvector.toSql(data?.embeddings ? data.embeddings[0] : []),
      })
      .limit(5)
      .execute();

    console.log(items);

    let out: Place[] = [];

    const place_repo = await this.dataSource.getRepository(Place);

    for (const item of items) {
      const place = await place_repo.findOne({
        where: {
          id: item.place_id,
        },
        relations: ['category'],
      });

      out.push(place);
    }

    return out;
  }
}
