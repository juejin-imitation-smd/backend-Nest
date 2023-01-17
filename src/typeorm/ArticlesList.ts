import { Column, PrimaryGeneratedColumn, Entity, ManyToOne } from 'typeorm';
import { Author } from './Author';
/**
 * 首页列表内文章item
 */
@Entity({ name: 'articlesList' })
export class ArticlesList {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  /**
   * 作者详情
   */
  @ManyToOne(() => Author, (author) => author.articlesLists)
  author: Author;
  /**
   * 评论数
   */
  @Column()
  comment_count: string;
  /**
   * 正文内容的前100字
   */
  @Column()
  content: string;
  /**
   * baae64
   */
  @Column({ nullable: true })
  image: string;
  /**
   * 标签（分区）
   */
  @Column()
  label: string;
  /**
   * 点赞数
   */
  @Column({ default: 18 })
  like_count: string;
  /**
   * 时间戳
   */
  @Column()
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
  view_count: string;
}
