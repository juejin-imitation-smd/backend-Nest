import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticlesList } from 'src/typeorm/ArticlesList';
import { Author } from 'src/typeorm/Author';
import { Repository } from 'typeorm';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
    @InjectRepository(ArticlesList)
    private readonly articlesReposity: Repository<ArticlesList>,
  ) {}

  create(author: Omit<Author, 'id' | 'articlesLists'>) {
    const newAuthor = this.authorRepository.create(author);
    return this.authorRepository.save(newAuthor);
  }

  async update(author: Author) {
    // TODO:
    const newAuthor = await this.authorRepository.preload({
      ...author,
      id: author.id,
    });

    if (newAuthor) this.authorRepository.save(newAuthor);
    else return null;
  }

  async findRange(page: number, size: number) {
    return this.authorRepository.find({
      skip: size * (page - 1),
      take: size,
    });
  }

  async findOne(id: number) {
    const author = await this.authorRepository.findOne({ where: { id } });
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
