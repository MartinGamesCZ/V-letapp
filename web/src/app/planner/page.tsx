import getIndexCategories from "@/api/index_categories";
import Context from "@/components/Context/Context";
import PlannerToolbar from "@/components/PlannerToolbar/PlannerToolbar";
import styles from "@/styles/planner/page.module.scss";

export default async function Page() {
  const categories = await getIndexCategories();

  return (
    <main className={styles.root}>
      <Context categories={categories} />
    </main>
  );
}
