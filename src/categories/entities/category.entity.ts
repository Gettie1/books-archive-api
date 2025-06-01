import { Book } from 'src/books/entities/book.entity';
import { Column, ManyToMany, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { Entity } from 'typeorm';
@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column({ type: 'text', nullable: true })
  description?: string;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
  @ManyToMany(() => Book, (book) => book.category)
  book: Relation<Book[]>; // Assuming Category is linked to Book
}
