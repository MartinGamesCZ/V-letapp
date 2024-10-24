import { Module } from '@nestjs/common';
import { RouterService } from './router.service';
import { RouterController } from './router.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature()],
  providers: [RouterService],
  controllers: [RouterController]
})
export class RouterModule {}
