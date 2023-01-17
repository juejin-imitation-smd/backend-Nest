import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Advertisement } from 'src/typeorm/advertisement';
import { ArticlesList } from 'src/typeorm/ArticlesList';
import { Author } from 'src/typeorm/Author';
import { Category } from 'src/typeorm/Category';
import { Label } from 'src/typeorm/Label';
import { BlogController } from './controller/blog/blog.controller';
import { BlogService } from './service/blog/blog.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Label,
      Category,
      Advertisement,
      Author,
      ArticlesList,
    ]),
  ],
  controllers: [BlogController],
  providers: [BlogService],
})
export class BlogModule {}
