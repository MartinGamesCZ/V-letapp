import Geobee from "geobee/dist";
import { API } from "./api";

export default async function getRouterRoute(
  location: [number, number],
  tripPlaces: string[]
) {
  const { data } = await API.post(`/router`, { location, tripPlaces });

  return data;
}

export async function getRouterRouteOrder(
  location: [number, number],
  tripPlaces: string[]
) {
  const { data } = await API.post(`/router/o`, { location, tripPlaces });

  return data;
}

export async function sortRouteOrder(route: string[], order: number[]) {
  if (!route) {
    return [];
  }

  if (route.length !== order.length) {
    return [];
  }

  const sorted = [];

  for (const o of order) {
    const i = route.findIndex((_, r: number) => r === o);

    sorted.push(route[i]);
  }

  return sorted;
}

export function getRouteLength(route: { coordinates: [number, number][] }) {
  if (!route) {
    return 0;
  }

  const points = route.coordinates;

  let distance = 0;

  for (const i in points) {
    const p1 = points[i];
    const p2 = points[parseInt(i) + 1];

    if (!p2) break;

    distance += Geobee.haversineDistance(p1, p2);
  }

  return distance;
}
