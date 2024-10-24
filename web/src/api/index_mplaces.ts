import { API } from "./api";

export default async function getMultiplePlaces(ids: string[]) {
  const { data } = await API.get(`/index/places/${ids.join(";")}`);

  return data;
}
