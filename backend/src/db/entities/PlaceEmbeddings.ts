import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({
  name: 'place_embeddings',
  synchronize: false,
})
export default class PlaceEmbeddings {
  @PrimaryColumn()
  place_id: string;

  @Column()
  embeddings: string;
}
