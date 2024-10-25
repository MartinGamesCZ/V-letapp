import Image from "next/image";
import styles from "@/styles/about/page.module.scss";
import { TbUsersGroup } from "react-icons/tb";
import { TbEyeglass2 } from "react-icons/tb";
import { TbTargetArrow } from "react-icons/tb";

export default function Page() {
  return (
    <main className={styles.root}>
      <h1>O nás</h1>
      <p>
        Jsme tým studentů z 2. ročníku (podzim 2024) oboru informační
        technologie na <a href="https://prumyslovkajicin.cz">VOŠ a SPŠ Jičín</a>
        .
      </p>
      <div className={styles.tmember}>
        <h2>Martin Petr</h2>
        <div className={styles.links}>
          <a href="https://www.mpdev.tech">Web</a>
          <a href="https://github.com/MartinGamesCZ">GitHub</a>
        </div>
        <p>
          &gt; Frontend plánovače + nové verze stránek 'Domů' a 'O nás',
          backend, hosting, údržba, technické vedení týmu
        </p>
      </div>
      <div className={styles.tmember}>
        <h2>Filip Zima</h2>
        <div className={styles.links}>
          <a href="https://github.com/Retrofilip1">GitHub</a>
        </div>
        <p>&gt; Původní stránka 'Domů' a 'O nás'</p>
      </div>
      <div className={styles.tmember}>
        <h2>David Stuchlík</h2>
        <div className={styles.links}>
          <a href="https://github.com/Dejv1s">GitHub</a>
        </div>
        <p>
          &gt; Design původní stránky 'Domů' a 'O nás', management a vedení týmu
        </p>
      </div>
      <div className={styles.tmember}>
        <h2>Michal Pešek</h2>
        <div className={styles.links}></div>
        <p>&gt; Design původní stránky 'Domů' a 'O nás'</p>
      </div>
    </main>
  );
}
