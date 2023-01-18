import { Module } from '@nestjs/common';
import { AuthorsController } from './controllers/authors/authors.controller';
import { AuthorsService } from './services/authors/authors.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from 'src/typeorm/Author';

@Module({
  imports: [TypeOrmModule.forFeature([Author])],
  controllers: [AuthorsController],
  providers: [AuthorsService],
})
export class CMSModule {}
