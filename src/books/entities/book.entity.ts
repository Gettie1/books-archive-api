import {
  Column,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
// import { Text } from 'typeorm';
import { Entity } from 'typeorm';
import { Author } from 'src/authors/entities/author.entity';
import { Bookreview } from 'src/bookreviews/entities/bookreview.entity';
import { Category } from 'src/categories/entities/category.entity';
@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  bookId: number;
  @Column({ unique: true })
  title: string; // Unique book title
  @Column({ type: 'text', nullable: true })
  description: string;
  @Column()
  publicationYear: Date;
  @Column()
  isAvailable: boolean;
  @ManyToOne(() => Author, (author) => author.book)
  author: Relation<Author>;
  @OneToMany(() => Bookreview, (bookReview) => bookReview.book)
  bookReview: Relation<Bookreview>;
  @ManyToMany(() => Category, (category) => category.book)
  @JoinTable()
  category: Relation<Category>;
}
