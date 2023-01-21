import { Column, PrimaryGeneratedColumn, Entity, ManyToOne } from 'typeorm';
import { Category } from './Category';

/**
 * 文章标签
 */
@Entity({ name: 'label' })
export class Label {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  label: string;

  @ManyToOne(() => Category, (category) => category.labels, {
    cascade: true,
  })
  category: Category;
}
