import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { QueryArticle } from 'src/blog/dtos/QueryArticle.dto';
import { QueryArticlesList } from 'src/blog/dtos/QueryArticlesList.dto';
import { BlogService } from 'src/blog/service/blog/blog.service';
@Controller('api')
export class BlogController {
  constructor(private blogService: BlogService) {}

  @Get('getArticles')
  @ApiQuery({ name: 'size', type: Number, required: true })
  @ApiQuery({ name: 'page', type: Number, required: true })
  @ApiQuery({ name: 'label', type: String, required: true })
  @ApiQuery({ name: 'type', type: String, required: true })
  findArticlesList(@Query() queryListParams: QueryArticlesList) {
    return this.blogService.findArticlesList(queryListParams);
  }
  // 广告
  @Get('advertisements')
  findAdvertisementList() {
    return this.blogService.findAdvertisementList();
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

  //获取所有类别，以及每类中标签
  @Get('getArticle')
  @ApiQuery({ name: 'id', type: Number, required: true })
  getArticle(@Query() queryArticleParams: QueryArticle) {
    return this.blogService.findOneArticle(queryArticleParams);
  }
}
