import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticlesList } from 'src/typeorm/ArticlesList';
import { Author } from 'src/typeorm/Author';
import { BlogController } from './controller/blog/blog.controller';
import { BlogService } from './service/blog/blog.service';

@Module({
  imports: [TypeOrmModule.forFeature([Author, ArticlesList])],
  controllers: [BlogController],
  providers: [BlogService],
})
export class BlogModule {}
