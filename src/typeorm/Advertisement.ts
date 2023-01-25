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
  @Column({
    type: "longblob",
    transformer: {
      to: (value: string) => Buffer.from(value),
      from: (value: Buffer) => value.toString()
    }
  })
  image: string;
  @Column()
  title: string;
}
