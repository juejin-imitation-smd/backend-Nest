import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  ManyToOne,
  AfterLoad,
} from 'typeorm';
import { Author } from './Author';
/**
 * 首页列表内文章item
 */
@Entity({ name: 'articlesList' })
export class ArticlesList {
  @PrimaryGeneratedColumn()
  id: number;
  /**
   * 作者详情
   */
  @ManyToOne(() => Author, (author) => author.articles)
  author: Author;
  /**
   * 评论数
   */
  @Column()
  comment_count: number;
  /**
   * 正文内容的前100字
   */
  @Column({
    type: 'text',
  })
  content: string;

  @Column()
  theme: string;

  /**
   * baae64
   */
  @Column({
    type: 'longblob',
    nullable: true,
    transformer: {
      to: (value: string) => Buffer.from(value),
      from: (value: Buffer | null) => (value ? value.toString() : null),
    },
  })
  image: string;
  /**
   * 标签（分区）
   */
  @Column()
  label: string;
  /**
   * 点赞数
   */
  @Column()
  like_count: number;
  /**
   * 时间戳
   */
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
  /**
   * 标题
   */
  @Column()
  title: string;
  /**
   * 阅读数
   */
  @Column()
  view_count: number;
  /**
   * 子标签
   * 数组以字符串形式存储( 插入 "," )
   */
  @Column()
  sub_tabs: string;
}
