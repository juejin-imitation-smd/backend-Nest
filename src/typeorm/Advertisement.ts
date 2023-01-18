import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';
/**
 * 广告
 */
@Entity({ name: 'advertisement' })
export class Advertisement {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  content: string;
  /**
   * base64
   */
  @Column()
  image: string;
  @Column()
  title: string;
}
