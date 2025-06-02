import { Injectable } from '@nestjs/common';
import { CreateBookreviewDto } from './dto/create-bookreview.dto';
import { UpdateBookreviewDto } from './dto/update-bookreview.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bookreview } from './entities/bookreview.entity'; // Assuming Bookreview is an entity defined in your project
import { User } from 'src/users/entities/user.entity'; // Assuming User is an entity defined in your project
import { Book } from 'src/books/entities/book.entity'; // Assuming Book is an entity defined in your project

@Injectable()
export class BookreviewsService {
  constructor(
    @InjectRepository(Bookreview) // Assuming Bookreview is an entity defined in your project
    private readonly bookreviewRepository: Repository<Bookreview>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}
  async create(createBookreviewDto: CreateBookreviewDto) {
    const foundUser = await this.userRepository.findOne({
      where: { id: Number(createBookreviewDto.userId) },
    });
    if (!foundUser) {
      throw new Error(`User with id ${createBookreviewDto.userId} not found`);
    }

    const foundBook = await this.bookRepository.findOne({
      where: { bookId: Number(createBookreviewDto.bookId) },
    });
    if (!foundBook) {
      throw new Error(`Book with id ${createBookreviewDto.bookId} not found`);
    }

    const bookreview = this.bookreviewRepository.create({
      content: createBookreviewDto.content,
      rating: createBookreviewDto.rating,
      user: foundUser,
      book: foundBook,
    });
    return this.bookreviewRepository.save(bookreview);
  }

  async findAll() {
    return this.bookreviewRepository.find({
      relations: ['user', 'book'], // Include user and book relations
      select: {
        id: true,
        content: true,
        rating: true,
      },
    });
  }

  async findOne(id: number) {
    const bookreview = await this.bookreviewRepository.findOne({
      where: { id: Number(id) },
      relations: ['user', 'book'], // Include user and book relations
      select: {
        id: true,
        content: true,
        rating: true,
      },
    });
    if (!bookreview) {
      throw new Error(`Book review with id ${id} not found`);
    }
    return bookreview;
  }
  async update(id: number, updateBookreviewDto: UpdateBookreviewDto) {
    const bookreview = await this.bookreviewRepository.findOne({
      where: { id: Number(id) },
    });
    if (!bookreview) {
      throw new Error(`Book review with id ${id} not found`);
    }
    Object.assign(bookreview, updateBookreviewDto);
    return this.bookreviewRepository.save(bookreview);
  }

  async remove(id: number) {
    const bookreview = await this.bookreviewRepository.findOne({
      where: { id: Number(id) },
    });
    if (!bookreview) {
      throw new Error(`Book review with id ${id} not found`);
    }
    return this.bookreviewRepository.remove(bookreview);
  }
}
