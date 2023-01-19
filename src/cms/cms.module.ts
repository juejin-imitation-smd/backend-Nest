import { Module } from '@nestjs/common';
import { AuthorsController } from './controllers/authors/authors.controller';
import { AuthorsService } from './services/authors/authors.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from 'src/typeorm/Author';
import { AdvertisementsService } from './services/advertisements/advertisements.service';
import { Advertisement } from 'src/typeorm/advertisement';
import { AdvertisementsController } from './controllers/advertisements/advertisements.controller';
import { ArticlesService } from './services/articles/articles.service';
import { ArticlesController } from './controllers/articles/articles.controller';
import { ArticlesList } from 'src/typeorm/ArticlesList';

@Module({
  imports: [TypeOrmModule.forFeature([Author, Advertisement, ArticlesList])],
  controllers: [
    AuthorsController,
    AdvertisementsController,
    ArticlesController,
  ],
  providers: [AuthorsService, AdvertisementsService, ArticlesService],
})
export class CMSModule {}
