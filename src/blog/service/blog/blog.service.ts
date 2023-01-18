import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, HttpStatus, Catch } from '@nestjs/common';
import { ArticlesList } from 'src/typeorm/ArticlesList';
import { Repository } from 'typeorm';
import { QueryArticlesList } from 'src/blog/dtos/QueryArticlesList.dto';
import { Advertisement } from 'src/typeorm/advertisement';
import { Author } from 'src/typeorm/Author';
import { Category } from 'src/typeorm/Category';
import { QueryArticle } from 'src/blog/dtos/QueryArticle.dto';
import { RouterList } from 'src/typeorm/RouterList';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(ArticlesList)
    private articlesListService: Repository<ArticlesList>,
    @InjectRepository(Advertisement)
    private advertisementService: Repository<Advertisement>,
    @InjectRepository(Author)
    private authorService: Repository<Author>,
    @InjectRepository(Category)
    private categoryService: Repository<Category>,
    @InjectRepository(RouterList)
    private routerService: Repository<RouterList>,
  ) {}
  // 文章列表
  async findArticlesList(articlesLists: QueryArticlesList) {
    const {
      label = 'all',
      subtab = 'all',
      type = 'recommend',
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
        case 'recommend':
          query = query.orderBy('article.like_count', 'DESC');
          break;
        default:
          query = query.orderBy('article.like_count', 'DESC');
      }

      switch (label) {
        case 'all':
          break;
        default:
          query = query.where('article.label = :label', { label });
          break;
      }
      switch (subtab) {
        case 'all':
          break;
        default:
          query = query.where('article.sub_tabs like :sub_tabs', {
            sub_tabs: `%${subtab}%`,
          });

          break;
      }
      const [articles, total] = await query
        .leftJoinAndSelect('article.author', 'author')
        .skip((page - 1) * size)
        .take(size)
        .getManyAndCount();

      articles.forEach((item) => {
        (item.sub_tabs as any) = item.sub_tabs
          ?.split(',')
          .filter((tab) => tab !== '');
        return item;
      });
      return {
        code: HttpStatus.OK,
        msg: '查询成功',
        data: articles,
      };
    } catch (error) {
      console.log(error);
      return {
        code: HttpStatus.BAD_REQUEST,
        msg: `查询失败${error.sqlMessage}`,
        data: null,
      };
    }
  }
  // 查询广告
  async findAdvertisementList() {
    try {
      const advertisementList = await this.advertisementService.find();
      return {
        code: HttpStatus.OK,
        msg: '查询成功',
        data: advertisementList,
      };
    } catch (error) {
      return {
        code: HttpStatus.BAD_REQUEST,
        msg: `查询失败${error.sqlMessage}`,
        data: null,
      };
    }
  }
  // 查询Top3作者
  async findAuthorsRank() {
    try {
      const top3Author = await this.authorService
        .createQueryBuilder('author')
        .orderBy('CAST(author.article_count as SIGNED)', 'DESC')
        .take(3)
        .getMany();
      return {
        code: HttpStatus.OK,
        msg: '查询成功',
        data: top3Author,
      };
    } catch (error) {
      return {
        code: HttpStatus.BAD_REQUEST,
        msg: `查询失败${error.sqlMessage}`,
        data: null,
      };
    }
  }
  // 分类
  async findCategory() {
    try {
      const category = await this.categoryService
        .createQueryBuilder('category')
        .leftJoinAndSelect('category.labels', 'label')
        .getMany();
      return {
        code: HttpStatus.OK,
        msg: '查询成功',
        data: category,
      };
    } catch (error) {
      return {
        code: HttpStatus.BAD_REQUEST,
        msg: `查询失败${error.sqlMessage}`,
        data: null,
      };
    }
  }

  // 根据id找文章
  async findOneArticle(params: QueryArticle) {
    try {
      const article = await this.articlesListService.createQueryBuilder(
        'article',
      );

      const pointArticle = await article
        .where('article.id = :id', { id: params.id })
        .leftJoinAndSelect('article.author', 'author')
        .getOne();

      const recommendArticle = await article
        .where('article.label = :label', { label: pointArticle.label })
        .andWhere('article.id != :id', { id: params.id })
        .orderBy('article.view_count', 'DESC')
        .take(10)
        .getMany();

      return {
        code: HttpStatus.OK,
        msg: '查询成功',
        data: { ...pointArticle, related_articles: recommendArticle },
      };
    } catch (error) {
      console.log(error);
      return {
        code: HttpStatus.BAD_REQUEST,
        msg: `查询失败${error.sqlMessage}`,
        data: null,
      };
    }
  }
  async findRouteList() {
    try {
      const routes = await this.routerService.find();
      return {
        code: HttpStatus.OK,
        msg: `查询成功`,
        data: routes,
      };
    } catch (error) {
      return {
        code: HttpStatus.BAD_REQUEST,
        msg: `查询失败${error.sqlMessage}`,
        data: null,
      };
    }
  }
}
