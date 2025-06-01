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
     ;
  }

  findAll() {
    return `This action returns all bookreviews`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bookreview`;
  }

  update(id: number, updateBookreviewDto: UpdateBookreviewDto) {
    return `This action updates a #${id} bookreview with content: ${updateBookreviewDto.content}`;
  }

  remove(id: number) {
    return `This action removes a #${id} bookreview`;
  }
}
