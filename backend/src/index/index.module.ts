import { Module } from '@nestjs/common';
import { IndexService } from './index.service';
import { IndexController } from './index.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature()],
  providers: [IndexService],
  controllers: [IndexController],
})
export class IndexModule {}
