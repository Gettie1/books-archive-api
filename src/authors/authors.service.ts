import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Author } from './entities/author.entity';
// import { Book } from 'src/books/entities/book.entity'; // Assuming Book is an entity defined in your project

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
  ) {}
  async create(
    authorId: string,
    name: string,
    createAuthorDto: CreateAuthorDto,
  ): Promise<Author> {
    // Check if an author with the same name already exists
    const existingAuthor = await this.authorRepository.findOne({
      where: { authorId: createAuthorDto.authorId },
    });
    if (existingAuthor) {
      throw new NotFoundException(
        `Author with name ${createAuthorDto.name} already exists`,
      );
    }
    const author = this.authorRepository.create({
      ...createAuthorDto,
      name, // Use the provided name
      bio: createAuthorDto.bio === null ? undefined : createAuthorDto.bio,
    });
    return this.authorRepository.save(author);
  }

  async findAll(search?: string): Promise<Author[]> {
    if (search) {
      return this.authorRepository.find({
        where: [{ name: search }, { bio: search }],
        relations: ['book'], // Include books relation
        select: ['authorId', 'name', 'bio', 'createdAt'],
      });
    }
    return this.authorRepository.find({
      relations: ['book'], // Include books relation
      select: ['authorId', 'name', 'bio', 'createdAt'],
    });
  }

  async findOne(id: number): Promise<Author> {
    const author = await this.authorRepository.findOne({
      where: { authorId: id },
      relations: ['book'], // Include books relation
      select: ['authorId', 'name', 'bio', 'createdAt'],
    });
    if (!author) {
      throw new NotFoundException(`Author with id ${id} not found`);
    }
    return author;
  }

  async update(id: number, updateAuthorDto: UpdateAuthorDto): Promise<Author> {
    const author = await this.authorRepository.findOne({
      where: { authorId: id },
    });
    if (!author) {
      throw new NotFoundException(`Author with id ${id} not found`);
    }
    Object.assign(author, updateAuthorDto);
    const updatedAuthor = author;
    return this.authorRepository.save(updatedAuthor);
  }

  async remove(id: number) {
    const author = await this.authorRepository.findOne({
      where: { authorId: id },
    });
    if (!author) {
      throw new NotFoundException(`Author with id ${id} not found`);
    }
    await this.authorRepository.delete(id);
    return { message: `Author with id ${id} deleted successfully` };
  }
}
