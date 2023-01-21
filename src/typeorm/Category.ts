import { Column, PrimaryGeneratedColumn, Entity, OneToMany } from 'typeorm';
import { Label } from './Label';

/**
 * 类别column
 */
@Entity({ name: 'category' })
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
  @OneToMany(() => Label, (label) => label.category)
  labels: Label[];
}
