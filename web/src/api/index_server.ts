import { API } from "./api";

export default async function search(query: string) {
  const { data } = await API.get(`/index/s?q=${query}`);
  return data;
}