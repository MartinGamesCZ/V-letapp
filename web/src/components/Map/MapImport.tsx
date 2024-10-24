import dynamic from "next/dynamic";
import { useMemo } from "react";
import Loader from "../ui/loader";
import styles from "./Map.module.scss";
import { IPlace } from "@/types/Place";
import { IRoute } from "@/types/Route";

export interface MapProps {
  uLoc: [number, number];
  places?: IPlace[];
  tripPlaces?: IPlace[];
  route: IRoute;
  loading: boolean;
}

export default function MapImport(props: MapProps) {
  const Map = useMemo(
    () =>
      dynamic(() => import("@/components/Map/Map"), {
        loading: () => <MapLoader />,
        ssr: false,
      }),
    []
  );

  if (props.loading) return <MapLoader />;

  return <Map {...props} />;
}

function MapLoader() {
  return (
    <div className={styles.loader}>
      <Loader size="lg" />
    </div>
  );
}
