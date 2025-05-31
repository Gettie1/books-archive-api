import { Column, ManyToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { Entity } from 'typeorm';
import { Book } from 'src/books/entities/book.entity';
@Entity()
export class Bookreview {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  content: string; // Review content
  @Column()
  rating: number;
  @Column()
  createdAt: Date;
  @ManyToOne(() => Book, (book) => book.bookReview)
  book: Relation<Book>;
  @ManyToOne(() => Book, (book) => book.bookReview)
  user: Relation<Book>; // Assuming Bookreview is linked to User, not Book
}
