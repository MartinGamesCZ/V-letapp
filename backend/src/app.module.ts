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
      host: process.env.POSTGRES_HOST,
      port: 5432,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
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
