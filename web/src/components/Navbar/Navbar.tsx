import Image from "next/image";
import Link from "next/link";
import styles from "./Navbar.module.scss";
import Searchbar from "../Searchbar/Searchbar";

export default function Navbar() {
  return (
    <nav className={styles.root}>
      <div className={styles.logo}>
        <h3>Výletapp</h3>
      </div>
      <Searchbar className={styles.search} />
      <div className={styles.links}>
        <Link href="/">Domů</Link>
        <Link href="/planner">Plánovač</Link>
        <Link href="/about">O nás</Link>
      </div>
    </nav>
  );
}
