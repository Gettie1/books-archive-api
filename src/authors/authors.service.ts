import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
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
      bio: createAuthorDto.bio ?? undefined,
    });
    return this.authorRepository.save(author);
  }

  async findAll() {
    const authors = await this.authorRepository.find({
      relations: ['book'], // Include books relation
      select: {
        authorId: true,
        name: true,
        bio: true,
        createdAt: true,
        book: {
          id: true,
          title: true,
          description: true,
        },
      },
    });
    if (!authors || authors.length === 0) {
      throw new BadRequestException('No authors found');
    }
    return authors;
  }

  async findOne(id: number) {
    const author = await this.authorRepository.findOne({
      where: { authorId: id },
      relations: ['book'], // Include books relation
      select: {
        authorId: true,
        name: true,
        bio: true,
        createdAt: true,
        book: {
          id: true,
          title: true,
          description: true,
        },
      },
    });
    if (!author) {
      throw new NotFoundException(`Author with id ${id} not found`);
    }
    return author;
  }

  async update(id: number, updateAuthorDto: UpdateAuthorDto) {
    const author = await this.authorRepository.findOne({
      where: { authorId: id },
    });
    if (!author) {
      throw new NotFoundException(`Author with id ${id} not found`);
    }
    // Convert authorId to number if present in updateAuthorDto
    const updateData = {
      ...updateAuthorDto,
      authorId:
        updateAuthorDto.authorId !== undefined
          ? Number(updateAuthorDto.authorId)
          : undefined,
      bio:
        updateAuthorDto.bio !== null && updateAuthorDto.bio !== undefined
          ? updateAuthorDto.bio
          : undefined,
    };
    const updatedAuthor = this.authorRepository.merge(author, updateData);
    return this.authorRepository.save(updatedAuthor);
  }

  async remove(id: number) {
    const author = await this.authorRepository.findOne({
      where: { authorId: id },
    });
    if (!author) {
      throw new NotFoundException(`Author with id ${id} not found`);
    }
    const books = await this.bookRepository.find({
      where: { author: { authorId: id } },
    });
    if (books.length > 0) {
      throw new BadRequestException(
        `Cannot delete author with id ${id} because they have associated books`,
      );
    }
    await this.authorRepository.delete(id);
    return { message: `Author with id ${id} deleted successfully` };
  }
}
