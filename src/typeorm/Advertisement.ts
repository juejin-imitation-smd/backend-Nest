import { Column, PrimaryGeneratedColumn, Entity, ManyToOne } from 'typeorm';
import { Author } from './Author';
/**
 * 广告
 */
@Entity({ name: 'advertisement' })
export class Advertisement {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

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
  image: string;

  @Column()
  time: Date;

  @ManyToOne(() => Author, (author) => author.articles)
  author: Author;

  @Column()
  view_count: number;

  @Column()
  like_count: number;

  @Column()
  comment_count: number;
}
