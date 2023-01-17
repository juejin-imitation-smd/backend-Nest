import { Catch, Controller, Get, Param, Query } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { QueryArticlesList } from 'src/blog/dtos/QueryArticlesList.dto';
import { BlogService } from 'src/blog/service/blog/blog.service';
@Controller('api')
@Catch(Error)
export class BlogController {
  constructor(private blogService: BlogService) {}

  @Get('getArticles')
  @ApiQuery({ name: 'size', type: Number, required: true })
  @ApiQuery({ name: 'page', type: Number, required: true })
  @ApiQuery({ name: 'label', type: String, required: true })
  @ApiQuery({ name: 'type', type: String, required: true })
  findArticlesList(@Query() queryListParams: QueryArticlesList) {
    console.log(queryListParams);
    return this.blogService.findArticlesList(queryListParams);
  }
}
