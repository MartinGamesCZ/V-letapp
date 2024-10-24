import { Body, Controller, Post } from '@nestjs/common';
import { RouterService } from './router.service';

@Controller('router')
export class RouterController {
  constructor(private readonly routerService: RouterService) {}

  @Post()
  async getRoute(
    @Body() body: { location: [number, number]; tripPlaces: string[] },
  ) {
    return await this.routerService.getRoute(body.tripPlaces, body.location);
  }

  @Post('o')
  async getRouteOrder(
    @Body() body: { location: [number, number]; tripPlaces: string[] },
  ) {
    return await this.routerService.getRouteOrder(
      body.tripPlaces,
      body.location,
    );
  }
}
