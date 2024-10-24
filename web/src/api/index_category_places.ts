import { API } from "./api";

export default async function getIndexCategoryPlaces(catId: string) {
  const { data } = await API.get(`/index/categories/${catId}/places`);

  return data;
}
