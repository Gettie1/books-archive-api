import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Author } from './entities/author.entity';
import { Book } from 'src/books/entities/book.entity'; // Assuming Book is an entity defined in your project

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
    @InjectRepository(Book) // Assuming Book is an entity defined in your project
    private readonly bookRepository: Repository<Book>,
  ) {}
  async create(createAuthorDto: CreateAuthorDto) {
    const authorId = Number(createAuthorDto.authorId);
    const authorExists = await this.authorRepository.findOne({
      where: { authorId: authorId },
    });
    if (authorExists) {
      throw new BadRequestException(
        `Author with id ${authorId} already exists`,
      );
    }
    const author = this.authorRepository.create({
      ...createAuthorDto,
      authorId,
    });
    return this.authorRepository.save(author);
  }

  findAll() {
    return `This action returns all authors`;
  }

  findOne(id: number) {
    return `This action returns a #${id} author`;
  }

  update(id: number, updateAuthorDto: UpdateAuthorDto) {
    return `This action updates a #${id} author with name: ${updateAuthorDto.name}`;
  }

  remove(id: number) {
    return `This action removes a #${id} author`;
  }
}
