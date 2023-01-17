import { Column, PrimaryGeneratedColumn, Entity, OneToMany } from 'typeorm';
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

  @OneToMany(() => ArticlesList, (articlesList) => articlesList.author)
  articlesLists: ArticlesList[];
}
