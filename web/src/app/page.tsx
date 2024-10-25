import Image from "next/image";
import styles from "@/styles/page.module.scss";
import PlanItButton from "@/components/PlanItButton/PlanItButton";
import AIPlanButton from "@/components/AIPlanButton/AIPlanButton";
import { TbMap } from "react-icons/tb";
import { TbLocationBroken } from "react-icons/tb";
import { TbInfoSquareRounded } from "react-icons/tb";
import { TbFilterSearch } from "react-icons/tb";
import { TbMapPins } from "react-icons/tb";
import { TbUser } from "react-icons/tb";
import HomepageSearchField from "@/components/HomepageSearchField/HomepageSearchField";
import Searchbar from "@/components/Searchbar/Searchbar";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className={styles.root}>
      <div className={styles.heading}>
        <h1>Výletapp</h1>
        <p>Výlety na pár kliknutí...</p>
        <Suspense fallback={<></>}>
          <Searchbar />
        </Suspense>
        <div className={styles.unsupported_message}>
          Pro využití plánovače otevřete stránku na počítači.
        </div>
        <p className={styles.ai_teaser}>Plánování pomocí AI je ve vývoji.</p>
      </div>
    </main>
  );
}

/**
 * <Image
        className={styles.background}
        width={1920}
        height={1080}
        alt=""
        src="/images/Background.png"
      ></Image>
      <div className={styles.homepageContent}>
        <h1>E-Výlety.cz</h1>
        <div className={styles.separatorLine}></div>
        <h2>Objevujte krásy Královéhradeckého kraje jedním kliknutím</h2>
        <div className={styles.plannerCard}>
          <h3>Výlet jedním kliknutím</h3>
          <p>Začni výběrem místa:</p>
          <HomepageSearchField></HomepageSearchField>
          <AIPlanButton></AIPlanButton>
          <p>Nebo plánuj manuálně:</p>
          <PlanItButton></PlanItButton>
        </div>
        <div className={styles.services}>
          <h4>Služby</h4>
          <div className={styles.separatorLine}></div>
          <div className={styles.servicesRow}>
            <div className={styles.service}>
              <TbMap className={styles.serviceIcons}></TbMap>
              <h5>Interaktivní mapa</h5>
              <p>
                Uživatelé mohou snadno procházet turistické památky pomocí
                uživatelsky přívětivé mapy.
              </p>
            </div>
            <div className={styles.service}>
              <TbLocationBroken
                className={styles.serviceIcons}
              ></TbLocationBroken>
              <h5>Přidání do navigace</h5>
              <p>
                Jedním kliknutím si uživatelé mohou přidat vybranou památku do
                navigace (Google Maps, Wayze apod.).
              </p>
            </div>
            <div className={styles.service}>
              <TbInfoSquareRounded
                className={styles.serviceIcons}
              ></TbInfoSquareRounded>
              <h5>Informace o památkách</h5>
              <p>
                Každá památka bude mít podrobné informace, včetně historie,
                otevírací doby, vstupného a doporučených aktivit v okolí.
              </p>
            </div>
            <div className={styles.service}>
              <TbFilterSearch className={styles.serviceIcons}></TbFilterSearch>
              <h5>Filtrování</h5>
              <p>
                Možnost filtrovat památky podle různých kritérií (např.
                kategorie).
              </p>
            </div>
            <div className={styles.service}>
              <TbMapPins className={styles.serviceIcons}></TbMapPins>
              <h5>Vytváření tras</h5>
              <p>
                Uživatelé si mohou vytvořit vlastní trasy mezi památkami podle
                svých preferení a časových možností.
              </p>
            </div>
            <div className={styles.service}>
              <TbUser className={styles.serviceIcons}></TbUser>
              <h5>Uživatelské rozhraní</h5>
              <p>
                Intuitivní a jednoduché rozhraní zajišťuje snadné ovládání pro
                všechny věkové skupiny.
              </p>
            </div>
          </div>
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
 */
