"use client";

import { useEffect, useState } from "react";
import Map from "../Map/MapImport";
import PlannerToolbar from "../PlannerToolbar/PlannerToolbar";
import Geobee from "geobee/dist";
import { ICategory } from "@/types/Category";
import { IPlace } from "@/types/Place";
import { useStore } from "zustand";
import { useDataStore } from "@/hooks/useDataStore";
import getMultiplePlaces from "@/api/index_mplaces";
import { IRoute } from "@/types/Route";
import getRouterRoute, {
  getRouterRouteOrder,
  sortRouteOrder,
} from "@/api/router_route";

type IContextProps = IContextPropsGlob | IContextPropsCat;

interface IContextPropsGlob {
  categories: ICategory[];
}

interface IContextPropsCat {
  category: ICategory;
  places: IPlace[];
}

const fakePosition: [number, number] = [50.2073903, 15.8301792];

export default function Context(props: IContextProps) {
  const [uLoc, setULoc] = useState<null | [number, number]>(null);
  const [tripPlaces, setTripPlaces] = useState<IPlace[]>([]);
  const [route, setRoute] = useState<IRoute>({
    route: [],
  });

  const trip = useStore(useDataStore, (s) => s.trip);

  useEffect(() => {
    Geobee.geolocate().then((loc) => {
      setULoc([loc.lat, loc.lon]);

      if (typeof window != "undefined") {
        window.navigator.geolocation.getCurrentPosition((p) => {
          setULoc([p.coords.latitude, p.coords.longitude]);
        });
      }
    });
  }, []);

  useEffect(() => {
    if (trip.split("/").filter((a) => a).length == 0) return;

    getMultiplePlaces(trip.split("/").filter((a) => a)).then(async (p) => {
      if (!uLoc) return setTripPlaces(p);

      const order = await getRouterRouteOrder(
        uLoc,
        trip.split("/").filter((a) => a)
      );
      const sorted = await sortRouteOrder(["_", ...p], order);

      console.log(sorted, order);

      setTripPlaces(sorted.filter((a) => a !== "_") as any);
    });

    if (!uLoc) return;

    getRouterRoute(
      uLoc,
      trip.split("/").filter((a) => a)
    ).then(setRoute);
  }, [trip, uLoc]);

  return (
    <>
      <Map
        uLoc={uLoc ?? [50, 11]}
        loading={uLoc == null}
        places={"places" in props ? props.places : []}
        route={route}
        tripPlaces={tripPlaces}
      />
      <PlannerToolbar
        {...props}
        tripPlaces={tripPlaces}
        route={route}
        uLoc={uLoc ?? [50, 11]}
      />
    </>
  );
}
