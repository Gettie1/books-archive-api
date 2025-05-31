import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';
import { Author } from 'src/authors/entities/author.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book) private readonly bookRepository: Repository<Book>,
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
  ) {}
  async create(createBookDto: { authorId?: number; [key: string]: any }) {
    // Omit authorId from createBookDto before creating the Book entity
    const { authorId, ...bookData } = createBookDto;
    const book = this.bookRepository.create(bookData);
    if (authorId) {
      const author = await this.authorRepository.findOne({
        where: { authorId: authorId },
      });
      if (author) {
        book.author = author;
      } else {
        throw new Error(`Author with id ${authorId} not found`);
      }
    }
    return this.bookRepository.save(book);
  }
  async findAll() {
    return this.bookRepository.find({
      relations: ['author'], // Include author relation
      select: {
        id: true,
        title: true,
        description: true,
        publicationYear: true,
        author: {
          authorId: true,
          name: true,
          bio: true,
        },
      },
    });
  }
  async findOne(id: number) {
    const book = await this.bookRepository.findOne({
      where: { id: Number(id) },
      relations: ['author'], // Include author relation
      select: {
        id: true,
        title: true,
        description: true,
        publicationYear: true, // Removed because it does not exist in Book entity
        isAvailable: true,
        author: {
          authorId: true,
          name: true,
          bio: true,
        },
      },
    });
    if (!book) {
      throw new Error(`Book with id ${id} not found`);
    }
    return book;
  }
  async update(
    id: number,
    updateBookDto: { authorId?: number; [key: string]: any },
  ) {
    const book = await this.bookRepository.findOne({
      where: { id: Number(id) },
    });
    if (!book) {
      throw new Error(`Book with id ${id} not found`);
    }
    Object.assign(book, updateBookDto);
    if (updateBookDto.authorId) {
      const author = await this.authorRepository.findOne({
        where: { authorId: updateBookDto.authorId },
      });
      if (author) {
        book.author = author;
      }
    }
    return this.bookRepository.save(book);
  }
  async remove(id: number) {
    const book = await this.bookRepository.findOne({
      where: { id: Number(id) },
    });
    if (!book) {
      throw new Error(`Book with id ${id} not found`);
    }
    return this.bookRepository.remove(book);
  }
}
