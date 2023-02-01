import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/AuthGuard';
import { QueryAdvertisement } from 'src/blog/dtos/QueryAdvertisement';
import { QueryArticle } from 'src/blog/dtos/QueryArticle.dto';
import { QueryArticlesList } from 'src/blog/dtos/QueryArticlesList.dto';
import { BlogService } from 'src/blog/service/blog/blog.service';

// @UseGuards(AuthGuard)
@Controller('api')
export class BlogController {
  constructor(private blogService: BlogService) {}

  @Get('getArticles')
  @ApiQuery({ name: 'size', type: Number, required: true })
  @ApiQuery({ name: 'page', type: Number, required: true })
  @ApiQuery({ name: 'subtab', type: String })
  @ApiQuery({ name: 'label', type: String })
  @ApiQuery({ name: 'type', type: String })
  findArticlesList(@Query() queryListParams: QueryArticlesList) {
    return this.blogService.findArticlesList(queryListParams);
  }
  // 广告
  @Get('advertisements')
  findAdvertisementList() {
    return this.blogService.findAdvertisementList();
  }

  // 获取指定广告
  @Get('advertisement')
  @ApiQuery({ name: 'id', type: Number, required: false })
  findAdvertisement(@Query() queryAdvertisement: QueryAdvertisement) {
    return this.blogService.findAdvertisementList(queryAdvertisement);
  }

  // TOP3作者
  @Get('authorsRank')
  getAuthorsRank() {
    return this.blogService.findAuthorsRank();
  }

  //获取所有类别，以及每类中标签
  @Get('column')
  getCategory() {
    return this.blogService.findCategory();
  }

  //获取指定文章
  @Get('article')
  @ApiQuery({ name: 'id', type: Number, required: true })
  getArticle(@Query() queryArticleParams: QueryArticle) {
    return this.blogService.findOneArticle(queryArticleParams);
  }

  //获取路由列表
  @Get('getroutes')
  getRouteList() {
    return this.blogService.findRouteList();
  }
}
