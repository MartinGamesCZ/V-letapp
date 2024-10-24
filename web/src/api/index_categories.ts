import { API } from "./api";

export default async function getIndexCategories() {
  const { data } = await API.get("/index/categories");

  return data;
}
