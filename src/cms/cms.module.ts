import { Module } from '@nestjs/common';
import { AuthorsController } from './controllers/authors/authors.controller';
import { AuthorsService } from './services/authors/authors.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from 'src/typeorm/Author';
import { AdvertisementsService } from './services/advertisements/advertisements.service';
import { Advertisement } from 'src/typeorm/advertisement';
import { AdvertisementsController } from './controllers/advertisements/advertisements.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Author, Advertisement])],
  controllers: [AuthorsController, AdvertisementsController],
  providers: [AuthorsService, AdvertisementsService],
})
export class CMSModule {}
