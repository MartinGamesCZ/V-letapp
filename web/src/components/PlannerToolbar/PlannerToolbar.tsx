import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import styles from "./PlannerToolbar.module.scss";
import { ICategory } from "@/types/Category";
import NavCard from "../ui/nav-card";
import { TbQrcode, TbX } from "react-icons/tb";
import { ScrollArea } from "../ui/scroll-area";
import { PlaceIcons } from "@/icons";
import { useRouter } from "next/navigation";
import { IPlace } from "@/types/Place";
import NavHeader from "../ui/nav-header";
import PlaceCard from "../ui/place-card";
import { useStore } from "zustand";
import { useDataStore } from "@/hooks/useDataStore";
import Geobee from "geobee/dist";
import PanelRouteInfo from "../PanelRouteInfo/PanelRouteInfo";
import { getRouteLength } from "@/api/router_route";
import { Button } from "../ui/button";

type IPlannerToolbarProps = IPlannerToolbarPropsCat | IPlannerToolbarPropsGlob;

interface IPlannerToolbarPropsGlob {
  categories: ICategory[];
  tripPlaces: IPlace[];
  route: any;
  uLoc: [number, number];
}

interface IPlannerToolbarPropsCat {
  category: ICategory;
  places: IPlace[];
  tripPlaces: IPlace[];
  route: any;
  uLoc: [number, number];
}

export default function PlannerToolbar(props: IPlannerToolbarProps) {
  const router = useRouter();

  const addPlace = useStore(useDataStore, (s) => s.addTripPlace);
  const remPlace = useStore(useDataStore, (s) => s.remTripPlace);
  const places = useStore(useDataStore, (s) => s.trip)
    .split("/")
    .filter((f) => f);

  return (
    <div className={styles.root}>
      <Tabs
        defaultValue="places"
        style={{
          height: "100%",
        }}
      >
        <TabsList>
          <TabsTrigger value="places">Místa</TabsTrigger>
          <TabsTrigger value="plan">Výlet</TabsTrigger>
        </TabsList>
        <TabsContent value="places">
          <Card className={styles.card}>
            <CardHeader>
              <CardTitle>Místa</CardTitle>
              <CardDescription>
                Zajímavá místa, která můžete navštívit
              </CardDescription>
            </CardHeader>
            <CardContent>
              {"categories" in props ? (
                <ScrollArea className={styles.categoryScroll}>
                  <div className={styles.categoryList}>
                    {props.categories.map((cat) => {
                      if (typeof window != "undefined")
                        router.prefetch(`/planner/${cat.id}`);

                      return (
                        <NavCard
                          label={cat.name}
                          key={cat.id}
                          icon={PlaceIcons[cat.id as keyof typeof PlaceIcons]}
                          onClick={() =>
                            router.push(`/planner/${cat.id}` + location.hash)
                          }
                        />
                      );
                    })}
                  </div>
                </ScrollArea>
              ) : (
                <>
                  <NavHeader
                    onBack={() => router.push("/planner" + location.hash)}
                    title={props.category.name}
                  />
                  <ScrollArea
                    className={styles.categoryScrollPlaces}
                    style={{
                      marginTop: "1rem",
                    }}
                  >
                    <div className={styles.categoryListPlaces}>
                      {props.places.map((plc) => {
                        return (
                          <PlaceCard
                            title={plc.name}
                            description={plc.description}
                            category={plc.category.name}
                            city={plc.city}
                            images={[]}
                            buttonTitle={
                              places.includes(plc.id) ? "Odebrat" : "Přidat"
                            }
                            onClick={() =>
                              places.includes(plc.id)
                                ? remPlace(plc.id)
                                : addPlace(plc.id)
                            }
                            key={plc.id}
                          />
                        );
                      })}
                    </div>
                  </ScrollArea>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="plan">
          <Card className={styles.card}>
            <CardHeader>
              <CardTitle>Výlet</CardTitle>
              <CardDescription>
                Vámi vybraná místa, která chcete navštívit
              </CardDescription>
              <div className={styles.nav_bar}>
                <Button
                  style={{
                    width: "100%",
                  }}
                  onClick={() =>
                    window.open(
                      `https://www.google.com/maps/dir/${props.uLoc.join(
                        ","
                      )}/${props.tripPlaces
                        .map((p) => `${p.latitude},${p.longitude}`)
                        .join("/")}`
                    )
                  }
                >
                  Navigovat
                </Button>
                <Button
                  variant={"outline"}
                  onClick={() => {
                    window.open(
                      `https://quickchart.io/qr?text=${encodeURIComponent(
                        `https://www.google.com/maps/dir/${props.uLoc.join(
                          ","
                        )}/${props.tripPlaces
                          .map((p) => `${p.latitude},${p.longitude}`)
                          .join("/")}`
                      )}`
                    );
                  }}
                >
                  <TbQrcode />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className={styles.categoryScrollTrip}>
                <div className={styles.categoryListPlaces}>
                  {props.tripPlaces.map((plc, i) => {
                    return (
                      <>
                        {i == 0 ? (
                          <p className={styles.uLoc}>Moje poloha</p>
                        ) : null}
                        {i < props.tripPlaces.length ? (
                          <PanelRouteInfo
                            distance={getRouteLength(props.route.route[i])}
                          />
                        ) : null}
                        <PlaceCard
                          title={plc.name}
                          description={plc.description}
                          category={plc.category.name}
                          city={plc.city}
                          images={[]}
                          buttonTitle={
                            places.includes(plc.id) ? "Odebrat" : "Přidat"
                          }
                          onClick={() =>
                            places.includes(plc.id)
                              ? remPlace(plc.id)
                              : addPlace(plc.id)
                          }
                          key={plc.id}
                          mlink={`https://quickchart.io/qr?text=${encodeURIComponent(
                            Geobee.openGMapsDirections([
                              plc.latitude,
                              plc.longitude,
                            ])
                          )}`}
                        />
                      </>
                    );
                  })}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
