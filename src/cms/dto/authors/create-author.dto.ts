import { ArticlesList } from 'src/typeorm/ArticlesList';

export class CreateAuthorDto {
  readonly username: string;
  readonly description: string;
  readonly avatar: string; // base64
  readonly article_count: number;
}

export class UpdateAuthorDto {
  readonly id: number;
  readonly username: string;
  readonly description: string;
  readonly avatar: string; // base64
  readonly article_count: number;
  readonly articles: ArticlesList[]; // base64
}
