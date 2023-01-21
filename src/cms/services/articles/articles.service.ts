import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateArticlesDto } from 'src/cms/dto/articles/create-article.dto';
import { UpdateArticleDto } from 'src/cms/dto/articles/update-article.dto';
import { ArticlesList } from 'src/typeorm/ArticlesList';
import { Author } from 'src/typeorm/Author';
import { Repository } from 'typeorm';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(ArticlesList)
    private readonly articlesRepository: Repository<ArticlesList>,
    @InjectRepository(Author)
    private readonly authorsRepository: Repository<Author>,
  ) {}

  findAll(page: number, size: number) {
    return this.articlesRepository.findAndCount({
      skip: size * (page - 1),
      take: size,
      relations: ['author'],
    });
  }

  findOne(id: number) {
    return this.articlesRepository.findOne({
      where: { id },
      relations: ['author'],
    });
  }

  async create(createArticlesDto: CreateArticlesDto) {
    const { author_id: id } = createArticlesDto;
    const existingAuthor = await this.authorsRepository.findOne({
      where: { id },
    });
    if (existingAuthor) {
      const newArticle = this.articlesRepository.create({
        ...createArticlesDto,
        author: existingAuthor,
      });
      return this.articlesRepository.save(newArticle);
    } else return null;
  }

  async update(updateArticleDto: UpdateArticleDto) {
    const { author_id } = updateArticleDto;
    const existingAuthor = await this.authorsRepository.findOne({
      where: { id: author_id },
    });
    if (existingAuthor) {
      const newArticle = await this.articlesRepository.preload({
        ...updateArticleDto,
        author: existingAuthor,
      });
      return this.articlesRepository.save(newArticle);
    } else return null;
  }

  async delete(id: number) {
    const article = await this.articlesRepository.findOne({ where: { id } });
    if (article) return this.articlesRepository.remove(article);
    else return null;
  }
}
