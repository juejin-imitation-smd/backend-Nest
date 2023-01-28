import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindAllAuthorDto } from 'src/cms/dto/authors/find-author.dto';
import { ArticlesList } from 'src/typeorm/ArticlesList';
import { Author } from 'src/typeorm/Author';
import { Like, Repository } from 'typeorm';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
    @InjectRepository(ArticlesList)
    private readonly articlesReposity: Repository<ArticlesList>,
  ) {}

  create(author: Omit<Author, 'id' | 'articles'>) {
    const newAuthor = this.authorRepository.create(author);
    return this.authorRepository.save(newAuthor);
  }

  async update(author: Author) {
    // TODO:
    const newAuthor = await this.authorRepository.preload({
      ...author,
      id: author.id,
    });

    if (newAuthor) return this.authorRepository.save(newAuthor);
    else return null;
  }

  async findAll(findAllAuthorDto: FindAllAuthorDto) {
    const { page, size, username } = findAllAuthorDto;
    return this.authorRepository.findAndCount({
      skip: size * (page - 1),
      take: size,
      where: { username: Like(`%${username}%`) },
    });
  }

  async findOne(id: number) {
    const author = (await this.authorRepository.findOne({
      where: { id },
      relations: ['articles'],
    })) as any;
    author.articles.forEach((item) => {
      delete item.content;
      delete item.image;
      item.sub_tabs = item.sub_tabs.split(',').filter((item) => item !== '');
    });
    return author;
  }

  async delete(id: number) {
    const author = await this.authorRepository.findOne({ where: { id } });
    if (author) {
      const list = await this.articlesReposity.find({ where: { author } });
      this.articlesReposity.remove(list);
      return this.authorRepository.remove(author);
    } else return null;
  }
}
