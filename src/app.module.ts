import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogModule } from './blog/blog.module';
import { Author } from './typeorm/Author';
import { ArticlesList } from './typeorm/ArticlesList';
import { CMSModule } from './cms/cms.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '12345678910',
      entities: [Author, ArticlesList],
      database: 'nuggetblog',
      synchronize: false,
    }),
    BlogModule,
    CMSModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
