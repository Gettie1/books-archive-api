import { Column, OneToMany, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { Book } from 'src/books/entities/book.entity';
import { Entity } from 'typeorm';
@Entity()
export class Author {
  @PrimaryGeneratedColumn()
  authorId: number;
  @Column()
  name: string;
  @Column()
  bio: string;
  @Column()
  birthDate: Date;
  @Column()
  isActive: boolean;
  @Column()
  createdAt: Date;
  @Column()
  upDatedAt: Date;
  @OneToMany(() => Book, (book) => book.author)
  book: Relation<Book>;
}
