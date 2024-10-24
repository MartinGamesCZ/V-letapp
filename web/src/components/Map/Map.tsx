import {
  CircleMarker,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  Tooltip,
  useMapEvent,
  GeoJSON,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import styles from "./Map.module.scss";
import { MapProps } from "./MapImport";
import PlaceCard from "../ui/place-card";
import { useStore } from "zustand";
import { useDataStore } from "@/hooks/useDataStore";

export default function Map({
  uLoc,
  places,
  route,
  tripPlaces: fTripPlaces,
}: MapProps) {
  const mapd = useStore(useDataStore, (s) => s.mapd);

  const center = mapd
    .split("@")[0]
    .split(";")
    .map((p) => parseFloat(p));
  const zoom = parseFloat(mapd.split("@")[1]);

  const addPlace = useStore(useDataStore, (s) => s.addTripPlace);
  const remPlace = useStore(useDataStore, (s) => s.remTripPlace);
  const tripPlaces = useStore(useDataStore, (s) => s.trip)
    .split("/")
    .filter((f) => f);

  return (
    <MapContainer
      center={
        center[0] == 0 && center[1] == 0 ? uLoc : (center as [number, number])
      }
      zoom={zoom}
      className={styles.root}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={uLoc}>
        <Tooltip>Vaše poloha</Tooltip>
      </Marker>
      {route.route
        ? route.route.map((r, i) => (
            <Route i={i} coordinates={r.coordinates} key={Math.random()} />
          ))
        : ""}
      {places
        ? places.map((p) => {
            return (
              <CircleMarker center={[p.latitude, p.longitude]} radius={5}>
                <Popup>
                  <PlaceCard
                    title={p.name}
                    description={p.description}
                    city={p.city}
                    category={p.category.name}
                    images={[]}
                    buttonTitle={
                      tripPlaces.includes(p.id) ? "Odebrat" : "Přidat"
                    }
                    onClick={() =>
                      tripPlaces.includes(p.id)
                        ? remPlace(p.id)
                        : addPlace(p.id)
                    }
                  />
                </Popup>
              </CircleMarker>
            );
          })
        : null}
      {fTripPlaces
        ? fTripPlaces.map((p) => {
            return (
              <CircleMarker
                center={[p.latitude, p.longitude]}
                radius={5}
                color="orange"
              >
                <Popup>
                  <PlaceCard
                    title={p.name}
                    description={p.description}
                    city={p.city}
                    category={p.category.name}
                    images={[]}
                    buttonTitle={
                      tripPlaces.includes(p.id) ? "Odebrat" : "Přidat"
                    }
                    onClick={() =>
                      tripPlaces.includes(p.id)
                        ? remPlace(p.id)
                        : addPlace(p.id)
                    }
                  />
                </Popup>
              </CircleMarker>
            );
          })
        : null}
      <DataLoader />
    </MapContainer>
  );
}

function DataLoader() {
  const setMapCenter = useStore(useDataStore, (s) => s.setMapCenter);
  const setMapZoom = useStore(useDataStore, (s) => s.setMapZoom);

  useMapEvent("moveend", (d) =>
    setMapCenter(
      Object.entries(d.target.getCenter()).map(([, v]) => v) as [number, number]
    )
  );

  useMapEvent("zoomend", (d) => setMapZoom(d.target.getZoom()));

  return null;
}

function Route({ coordinates, i }: { coordinates: any[]; i: number }) {
  if (coordinates.length == 0) return null;

  return (
    <GeoJSON
      data={
        {
          type: "LineString",
          coordinates: coordinates.toReversed() as any,
        } as any
      }
      style={{
        color: ["red", "blue", "green", "purple", "orange", "yellow", "black"][
          i % 7
        ],
      }}
    />
  );
}
