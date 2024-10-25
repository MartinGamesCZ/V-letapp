"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./Navbar.module.scss";
import Searchbar from "../Searchbar/Searchbar";
import { TbMenu } from "react-icons/tb";
import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
      <div
        className={styles.hamburger}
        onClick={() => setIsMenuOpen((o) => !o)}
      >
        <TbMenu size={32} />
      </div>
      <div className={styles.mobMenu} data-open={isMenuOpen}>
        <Link onClick={() => setIsMenuOpen(false)} href="/">
          Domů
        </Link>
        <Link onClick={() => setIsMenuOpen(false)} href="/planner">
          Plánovač
        </Link>
        <Link onClick={() => setIsMenuOpen(false)} href="/about">
          O nás
        </Link>
      </div>
    </nav>
  );
}
