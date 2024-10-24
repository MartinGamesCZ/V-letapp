import { Controller, Get, Param, Query } from '@nestjs/common';
import { IndexService } from './index.service';

@Controller('index')
export class IndexController {
  constructor(private readonly indexService: IndexService) {}

  @Get('categories')
  async getCategories() {
    return await this.indexService.getCategories();
  }

  @Get('categories/:id/places')
  async getCategoryPlaces(@Param('id') categoryId: string) {
    return await this.indexService.getCategoryPlaces(categoryId);
  }

  @Get('/places/:ids')
  async getMultiplePlaces(@Param('ids') ids: string) {
    return await this.indexService.getMultiplePlaces(ids.split(';'));
  }

  @Get('/s')
  async searchPlaces(@Query('q') query: string) {
    return await this.indexService.searchPlaces(query);
  }
}
