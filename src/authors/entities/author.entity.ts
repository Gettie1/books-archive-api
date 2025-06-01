import { Column, OneToMany, PrimaryColumn, Relation } from 'typeorm';
import { Book } from 'src/books/entities/book.entity';
import { Entity } from 'typeorm';
@Entity()
export class Author {
  @PrimaryColumn()
  authorId: number;
  @Column()
  name: string;
  @Column({ type: 'text', nullable: true })
  bio: string;
  @Column({ nullable: true })
  birthDate: Date;
  @Column({ type: 'boolean', default: true })
  isActive: boolean;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  upDatedAt: Date;
  @OneToMany(() => Book, (book) => book.author)
  book: Relation<Book>[]; // One author can write multiple books
}
