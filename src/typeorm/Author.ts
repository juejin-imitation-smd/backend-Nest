import { Column, PrimaryGeneratedColumn, Entity, ManyToOne } from 'typeorm';
import { ArticlesList } from './ArticlesList';

/**
 * 作者用户名
 *
 * 作者
 */
@Entity({ name: 'author' })
export class Author {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  article_count: string;
  /**
   * base64
   */
  @Column()
  avatar: string;

  @Column()
  description: string;

  @Column()
  username: string;

  @ManyToOne(() => ArticlesList, (articlesList) => articlesList.author)
  articlesLists: ArticlesList[];
}
