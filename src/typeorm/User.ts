import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';

/**
 * 管理员信息
 */
@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  user_name: string;

  @Column()
  password: string;

  @Column()
  createAt: Date;
}
