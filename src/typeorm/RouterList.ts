import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';

/**
 * 路由列表
 */
@Entity({ name: 'router_list' })
export class RouterList {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  url: string;

  @Column()
  name: string;

  @Column({
    nullable: true,
  })
  label: string;
}
