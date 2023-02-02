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

  @Column({
    type: 'text',
  })
  content: string;

  @Column()
  theme: string;

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

  @Column({
    transformer: {
      to: (time: string) => {
        return new Date(parseInt(time));
      },
      from: (time: Date) => {
        return time.getTime().toString();
      },
    },
  })
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
