import Image from "next/image";
import styles from "@/styles/about/page.module.scss";
import { TbUsersGroup } from "react-icons/tb";
import { TbEyeglass2 } from "react-icons/tb";
import { TbTargetArrow } from "react-icons/tb";

export default function Page() {
  return (
    <div className={styles.aboutPageContent}>
      <Image
        className={styles.background}
        width={1920}
        height={1080}
        alt=""
        src="/images/Background.png"
      ></Image>
      <h2>O nás</h2>
      <div className={styles.separatorLine}></div>
      <div className={styles.aboutUsItems}>
        <div className={styles.aboutUsItem}>
          <TbUsersGroup className={styles.aboutIcons}></TbUsersGroup>
          <h3>O nás</h3>
          <p>
            Jsme druháci z VOŠ a SPŠ Jicín a věříme, že každý okamžik by měl být
            jedinečný a bez stresu.
          </p>
        </div>
        <div className={styles.aboutUsItem}>
          <TbEyeglass2 className={styles.aboutIcons}></TbEyeglass2>
          <h3>Naše vize</h3>
          <p>
            Chceme nabídnout lidem možnost naplánování výletů a dobrodružství
            pomocí jednoho kliknutí myši.
          </p>
        </div>
      </div>
      <div className={styles.aboutUsItems}>
        <div className={styles.aboutUsItem}>
          <TbTargetArrow className={styles.aboutIcons}></TbTargetArrow>
          <h3>Naše cíle</h3>
          <p>
            Cílem naší aplikace je okamžitě navrhnout výlety a další aktivity na
            míru vašim zájmům.
          </p>
        </div>
      </div>
      <svg
        className={styles.wave}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <path
          fill="#1d4ed8"
          fillOpacity="1"
          d="M0,256L48,256C96,256,192,256,288,234.7C384,213,480,171,576,154.7C672,139,768,149,864,165.3C960,181,1056,203,1152,202.7C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>
    </div>
  );
}
