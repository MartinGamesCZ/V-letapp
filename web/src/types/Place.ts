import { ICategory } from "./Category";

export interface IPlace {
  id: string;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  city: string;
  category: ICategory;
}
