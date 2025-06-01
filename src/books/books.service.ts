import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';
import { Author } from 'src/authors/entities/author.entity';
import { CreateBookDto } from './dto/create-book.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book) private readonly bookRepository: Repository<Book>,
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
  ) {}
  async create(createBookDto: CreateBookDto): Promise<Book> {
    const foundAuthor = await this.authorRepository.findOne({
      where: { authorId: Number(createBookDto.authorId) },
    });
    if (!foundAuthor) {
      throw new Error(`Author with id ${createBookDto.authorId} not found`);
    }
    const book = this.bookRepository.create({
      title: createBookDto.title,
      description: createBookDto.description,
      publicationYear: createBookDto.publicationYear,
      isAvailable: createBookDto.isAvailable,
      author: foundAuthor,
    });
    return this.bookRepository.save(book);
  }

  async findAll() {
    return this.bookRepository.find({
      relations: ['author'], // Include author relation
      select: {
        bookId: true,
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
      where: { bookId: Number(id) },
      relations: ['author'], // Include author relation
      select: {
        bookId: true,
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
      return new NotFoundException(`Book with id ${id} not found`);
    }
    return book;
  }
  async update(
    id: number,
    updateBookDto: { authorId?: number; [key: string]: any },
  ) {
    const book = await this.bookRepository.findOne({
      where: { bookId: Number(id) },
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
      where: { bookId: Number(id) },
    });
    if (!book) {
      throw new Error(`Book with id ${id} not found`);
    }
    return this.bookRepository.remove(book);
  }
}
