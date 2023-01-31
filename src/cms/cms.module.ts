import { Module } from '@nestjs/common';
import { AuthorsController } from './controllers/authors/authors.controller';
import { AuthorsService } from './services/authors/authors.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from 'src/typeorm/Author';
import { AdvertisementsService } from './services/advertisements/advertisements.service';
import { Advertisement } from 'src/typeorm/Advertisement';
import { AdvertisementsController } from './controllers/advertisements/advertisements.controller';
import { ArticlesService } from './services/articles/articles.service';
import { ArticlesController } from './controllers/articles/articles.controller';
import { ArticlesList } from 'src/typeorm/ArticlesList';
import { LabelsController } from './controllers/labels/labels.controller';
import { LabelsService } from './services/labels/labels.service';
import { CategoriesController } from './controllers/categories/categories.controller';
import { CategoriesService } from './services/categories/categories.service';
import { Category } from 'src/typeorm/Category';
import { Label } from 'src/typeorm/Label';
import { RoutesController } from './controllers/routes/routes.controller';
import { RoutesService } from './services/routes/routes.service';
import { RouterList } from 'src/typeorm/RouterList';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Author,
      Advertisement,
      ArticlesList,
      Category,
      Label,
      RouterList,
    ]),
  ],
  controllers: [
    AuthorsController,
    AdvertisementsController,
    ArticlesController,
    LabelsController,
    CategoriesController,
    RoutesController,
  ],
  providers: [
    AuthorsService,
    AdvertisementsService,
    ArticlesService,
    LabelsService,
    CategoriesService,
    RoutesService,
  ],
})
export class CMSModule {}
