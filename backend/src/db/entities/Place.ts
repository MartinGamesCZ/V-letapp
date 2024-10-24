import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import Category from './Category';

@Entity()
export default class Place {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  city: string;

  @Column({
    type: 'float',
  })
  latitude: number;

  @Column({
    type: 'float',
  })
  longitude: number;

  @ManyToOne(() => Category, (category) => category.id)
  category: Category;
}
