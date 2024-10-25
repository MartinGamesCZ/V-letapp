import getIndexCategories from "@/api/index_categories";
import getIndexCategoryPlaces from "@/api/index_category_places";
import search from "@/api/index_server";
import Context from "@/components/Context/Context";
import PlannerToolbar from "@/components/PlannerToolbar/PlannerToolbar";
import styles from "@/styles/planner/page.module.scss";
import { ICategory } from "@/types/Category";

export default async function Page({
  params,
  searchParams,
}: {
  params: {
    category: string;
  };
  searchParams: any;
}) {
  const category =
    params.category == "search"
      ? {
          id: "_s",
          name: `Hledaný výraz "${searchParams.q}"`,
        }
      : (await getIndexCategories()).find(
          (c: ICategory) => c.id == params.category
        );
  const places =
    params.category == "search"
      ? await search(searchParams.q)
      : await getIndexCategoryPlaces(params.category);

  return (
    <main className={styles.root}>
      <div className={styles.unsupported_message}>
        Plánovač ještě není přizpůsobený pro mobilní zařízení. Prosím, otevřete
        stránku na počítači.
      </div>
      <Context places={places} category={category} />
    </main>
  );
}
