import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogModule } from './blog/blog.module';
import { Author } from './typeorm/Author';
import { ArticlesList } from './typeorm/ArticlesList';
import { CMSModule } from './cms/cms.module';
import { Advertisement } from './typeorm/Advertisement';
import { Label } from './typeorm/Label';
import { Category } from './typeorm/Category';
import { RouterList } from './typeorm/RouterList';
import { UserModule } from './user/user.module';
import { User } from './typeorm/User';
import { PhotoModule } from './photo/photo.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.local',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.SERVER_ADDRESS,
      port: 3306,
      username: 'root',
      password: '12345678910',
      entities: [
        RouterList,
        Label,
        Category,
        Advertisement,
        Author,
        ArticlesList,
        User,
      ],
      database: 'nuggetblog',
      synchronize: false,
    }),
    BlogModule,
    CMSModule,
    UserModule,
    PhotoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
