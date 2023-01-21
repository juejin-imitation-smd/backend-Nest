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
  id: number;

  @Column()
  article_count: number;
  /**
   * base64
   */
  @Column({
    type: 'longblob',
    transformer: {
      to: (value: string) => Buffer.from(value),
      from: (value: Buffer) => value.toString(),
    },
  })
  avatar: string;

  @Column()
  description: string;

  @Column()
  username: string;

  @OneToMany(() => ArticlesList, (articlesList) => articlesList.author)
  articles: ArticlesList[];
}
