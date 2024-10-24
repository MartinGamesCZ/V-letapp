import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export default class Category {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;
}
