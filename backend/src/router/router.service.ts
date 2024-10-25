import { Injectable } from '@nestjs/common';
import Place from '../db/entities/Place';
import { DataSource } from 'typeorm';
import Geobee from 'geobee';

@Injectable()
export class RouterService {
  constructor(private readonly dataSource: DataSource) {}

  async getRoute(tripPlaces: string[], location: [number, number]) {
    const repo = this.dataSource.getRepository(Place);

    const places: Place[] = [];

    for (const id of tripPlaces) {
      const p = await repo.findOne({
        where: {
          id: id,
        },
      });

      places.push(p);
    }

    const router = new Geobee.TSP(new Geobee.OSRM(process.env.ROUTER_HOST));

    const route = await router.findRoute(
      [location, ...places.map((p) => [p.latitude, p.longitude])].map((v) =>
        v.reverse(),
      ) as [number, number][],
      0,
    );

    return route;
  }

  async getRouteOrder(tripPlaces: string[], location: [number, number]) {
    const repo = this.dataSource.getRepository(Place);

    const places: Place[] = [];

    for (const id of tripPlaces) {
      const p = await repo.findOne({
        where: {
          id: id,
        },
      });

      places.push(p);
    }

    const router = new Geobee.TSP(new Geobee.OSRM(process.env.ROUTER_HOST));

    const route = await router.find(
      [location, ...places.map((p) => [p.latitude, p.longitude])].map((v) =>
        v.reverse(),
      ) as [number, number][],
      0,
    );

    return route;
  }
}
