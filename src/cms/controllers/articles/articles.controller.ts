import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateArticlesDto } from 'src/cms/dto/articles/create-article.dto';
import { FindAllAtricleDto } from 'src/cms/dto/articles/find-article.dto';
import { UpdateArticleDto } from 'src/cms/dto/articles/update-article.dto';
import { ArticlesService } from 'src/cms/services/articles/articles.service';

@Controller('api/cms')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get('getArticles')
  async findAll(@Query() findAllAtricleDto: FindAllAtricleDto) {
    const [list, total] = await this.articlesService.findAll(findAllAtricleDto);
    return {
      code: HttpStatus.OK,
      msg: 'ok',
      data: { list, total },
    };
  }

  @Get('article')
  async findOne(@Query() idQuery: { id: number }) {
    const { id } = idQuery;
    const article = await this.articlesService.findOne(id);
    return {
      code: article ? HttpStatus.OK : HttpStatus.BAD_REQUEST,
      msg: article ? 'ok' : 'invalid id',
      data: { article },
    };
  }

  @Post('article')
  async create(@Body() createArticlesDto: CreateArticlesDto) {
    const article = await this.articlesService.create(createArticlesDto);
    return {
      code: article ? HttpStatus.OK : HttpStatus.BAD_REQUEST,
      msg: article ? 'ok' : 'cannot found author',
      data: article ? { id: article.id } : null,
    };
  }

  @Put('article')
  async update(@Body() updateArticleDto: UpdateArticleDto) {
    const article = await this.articlesService.update(updateArticleDto);
    return {
      code: article ? HttpStatus.OK : HttpStatus.BAD_REQUEST,
      msg: article ? 'ok' : 'invalid article id or author id',
      data: null,
    };
  }

  @Delete('article')
  async delete(@Query() idQuery: { id: number }) {
    const { id } = idQuery;
    const res = await this.articlesService.delete(id);
    return {
      code: res ? HttpStatus.OK : HttpStatus.BAD_REQUEST,
      msg: res ? 'ok' : 'invalid id',
      data: null,
    };
  }
}
