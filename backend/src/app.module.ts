import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IndexerService } from './indexer/indexer.service';
import { IndexModule } from './index/index.module';
import { RouterModule } from './router/router.module';
import Place from './db/entities/Place';
import Category from './db/entities/Category';
import PlaceEmbeddings from './db/entities/PlaceEmbeddings';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '10.5.0.5',
      port: 5432,
      username: 'root',
      password: process.env.POSTGRES_PASSWORD,
      database: 'data',
      synchronize: true,
      entities: [Place, Category, PlaceEmbeddings],
    }),
    IndexModule,
    RouterModule,
  ],
  controllers: [AppController],
  providers: [AppService, IndexerService],
})
export class AppModule {}
