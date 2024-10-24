import { create } from "zustand";
import hashStorage from "zustand-hash-storage";

export interface IDataStore {
  mapd: string;
  trip: string;

  setMapCenter: (center: [number, number]) => void;
  setMapZoom: (zoom: number) => void;

  addTripPlace: (id: string) => void;
  remTripPlace: (id: string) => void;
}

export const useDataStore = create<IDataStore>()(
  hashStorage(
    (set, get) => ({
      mapd: "0;0@12",
      trip: "",

      setMapCenter: (center: [number, number]) => {
        set({
          mapd: center.join(";") + "@" + get().mapd.split("@")[1],
        });
      },

      setMapZoom: (zoom: number) => {
        set({
          mapd: get().mapd.split("@")[0] + "@" + zoom,
        });
      },

      addTripPlace: (id: string) => {
        set({
          trip: get().trip + "/" + id,
        });
      },

      remTripPlace: (id: string) => {
        set({
          trip: get()
            .trip.split("/")
            .filter((a) => a != id)
            .join("/"),
        });
      },
    }),
    {}
  )
);
