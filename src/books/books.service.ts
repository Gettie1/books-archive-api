import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';
import { Author } from 'src/authors/entities/author.entity';
import { Category } from 'src/categories/entities/category.entity';
import { CreateBookDto } from './dto/create-book.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book) private readonly bookRepository: Repository<Book>,
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
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
  //  manyToMany
  async addCategoryToBook(bookId: number, categoryId: number) {
    const book = await this.bookRepository.findOne({
      where: { bookId: Number(bookId) },
      relations: ['category'], // Include category relation
    });
    if (!book) {
      throw new NotFoundException(`Book with id ${bookId} not found`);
    }
    const category = await this.categoryRepository.findOne({
      where: { id: Number(categoryId) },
    });
    if (!category) {
      throw new NotFoundException(`Category with id ${categoryId} not found`);
    }
    // Ensure book.category is an array
    if (!Array.isArray(book.category)) {
      book.category = [];
    }
    // Prevent duplicate categories
    if (!book.category.some((cat) => cat.id === category.id)) {
      book.category.push(category);
    }
    return this.bookRepository.save(book);
  }
  async removeCategoryFromBook(bookId: number, categoryId: number) {
    const book = await this.bookRepository.findOne({
      where: { bookId: Number(bookId) },
      relations: ['category'], // Include category relation
    });
    if (!book) {
      throw new NotFoundException(`Book with id ${bookId} not found`);
    }
    book.category = book.category.filter(
      (category) => category.id !== categoryId,
    );
    return this.bookRepository.save(book);
  }
  async findBooksByCategory(categoryId: number) {
    const books = await this.bookRepository.find({
      where: {
        category: {
          id: Number(categoryId),
        },
      },
      relations: ['category'], // Include category relation
      select: {
        bookId: true,
        title: true,
        description: true,
        publicationYear: true,
        isAvailable: true,
        category: {
          id: true,
          name: true,
          description: true,
        },
      },
    });
    if (books.length === 0) {
      throw new NotFoundException(
        `No books found for category id ${categoryId}`,
      );
    }
    return books;
  }
}
