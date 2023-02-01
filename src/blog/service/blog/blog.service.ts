import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, HttpStatus, Catch, HttpException } from '@nestjs/common';
import { ArticlesList } from 'src/typeorm/ArticlesList';
import { Repository } from 'typeorm';
import { QueryArticlesList } from 'src/blog/dtos/QueryArticlesList.dto';
import { Advertisement } from 'src/typeorm/Advertisement';
import { Author } from 'src/typeorm/Author';
import { Category } from 'src/typeorm/Category';
import { QueryArticle } from 'src/blog/dtos/QueryArticle.dto';
import { RouterList } from 'src/typeorm/RouterList';
import { QueryAdvertisement } from 'src/blog/dtos/QueryAdvertisement';

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
  async findArticlesList(articles: QueryArticlesList) {
    const {
      label = 'all',
      subtab = 'all',
      type = 'recommend',
      page = 1,
      size = 20,
    } = articles;

    try {
      let query = this.articlesListService.createQueryBuilder('article');
      switch (type) {
        case 'newest':
          query = query.orderBy('article.time', 'DESC');
          break;
        case 'hottest':
          query = query.orderBy('article.view_count', 'DESC');
          break;
        case 'recommend':
          query = query.orderBy('article.like_count', 'DESC');
        case 'three_days_hottest':
          query = query
            .where('article.time >= :time', {
              time: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
            })
            .orderBy('article.view_count', 'DESC');
          break;
        case 'weekly_hottest':
          query = query
            .where('article.time >= :time', {
              time: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
            })
            .orderBy('article.view_count', 'DESC');
          break;
        case 'monthly_hottest':
          query = query
            .where('article.time >= :time', {
              time: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
            })
            .orderBy('article.view_count', 'DESC');
          break;
        default:
          query = query.orderBy('article.like_count', 'DESC');
      }

      switch (label) {
        case 'all':
          break;
        default:
          query = query.andWhere('article.label = :label', { label });
          break;
      }
      switch (subtab) {
        case 'all':
          break;
        default:
          query = query.andWhere('article.sub_tabs like :sub_tabs', {
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
        data: {
          list: articles,
        },
      };
    } catch (error) {
      console.log(error);
      return {
        code: HttpStatus.BAD_REQUEST,
        msg: new HttpException(error, HttpStatus.BAD_REQUEST).message,
        data: null,
      };
    }
  }
  // 查询广告
  async findAdvertisementList(params: QueryAdvertisement) {
    let advertisement: any = [];

    try {
      if (params.id) {
        advertisement = await this.advertisementService.findOne({
          where: { id: params.id },
          relations: ['author'],
        });
      } else {
        advertisement = await this.advertisementService.find({
          relations: ['author'],
        });
      }

      return {
        code: HttpStatus.OK,
        msg: '查询成功',
        data: advertisement,
      };
    } catch (error) {
      return {
        code: HttpStatus.BAD_REQUEST,
        msg: new HttpException(error, HttpStatus.BAD_REQUEST).message,
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
        data: { list: top3Author },
      };
    } catch (error) {
      return {
        code: HttpStatus.BAD_REQUEST,
        msg: new HttpException(error, HttpStatus.BAD_REQUEST).message,
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
        msg: new HttpException(error, HttpStatus.BAD_REQUEST).message,
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
        msg: new HttpException(error, HttpStatus.BAD_REQUEST).message,
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
        msg: new HttpException(error, HttpStatus.BAD_REQUEST).message,
        data: null,
      };
    }
  }
}
