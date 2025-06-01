import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { Book } from 'src/books/entities/book.entity'; // Assuming Book is an entity defined in your project

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Book) private readonly bookRepository: Repository<Book>, // Assuming Book is an entity defined in your project
  ) {}
  create(createCategoryDto: CreateCategoryDto) {
    
  }

  findAll() {
    return `This action returns all categories`;
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category with name: ${updateCategoryDto.name}`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
