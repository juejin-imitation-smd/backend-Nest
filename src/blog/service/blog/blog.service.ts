import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, HttpStatus, Catch } from '@nestjs/common';
import { ArticlesList } from 'src/typeorm/ArticlesList';
import { Repository } from 'typeorm';
import { QueryArticlesList } from 'src/blog/dtos/QueryArticlesList.dto';

@Injectable()
@Catch()
export class BlogService {
  @InjectRepository(ArticlesList)
  private articlesListService: Repository<ArticlesList>;

  async findArticlesList(articlesLists: QueryArticlesList) {
    const {
      label = 'all',
      type = 'newest',
      page = 1,
      size = 20,
    } = articlesLists;

    try {
      let query = this.articlesListService.createQueryBuilder('article');
      switch (type) {
        case 'newest':
          query = query.orderBy('article.time', 'DESC');
          break;
        case 'hot':
          query = query.orderBy('article.view_count', 'DESC');
          break;
          //   case 'recommend':
          //     query = query.where('article.isRecommend = :isRecommend', {
          //       isRecommend: true,
          //     });
          break;
        default:
          query = query.orderBy('article.time', 'DESC');
      }
      switch (label) {
        case 'all':
          break;
        default:
          query = query.where('article.label = :label', { label });
          break;
      }
      const [articles, total] = await query
        .leftJoinAndSelect('article.author', 'author')
        .skip((page - 1) * size)
        .take(size)
        .getManyAndCount();
      return {
        code: HttpStatus.OK,
        msg: '查询成功',
        data: articles,
      };
    } catch (error) {
      return {
        code: HttpStatus.BAD_REQUEST,
        msg: '查询失败',
        data: [],
      };
    }
  }
}
