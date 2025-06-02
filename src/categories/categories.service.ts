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
  async create(createCategoryDto: CreateCategoryDto) {
    const category = this.categoryRepository.create({
      name: createCategoryDto.name,
      description: createCategoryDto.description,
    });
    return this.categoryRepository.save(category);
  }

  async findAll(search?: string) {
    if (search) {
      return this.categoryRepository.find({
        where: [{ name: search }, { description: search }],
        relations: ['book'], // Include books relation
        select: ['id', 'name', 'description', 'createdAt'],
      });
    }
    return this.categoryRepository.find({
      relations: ['book'], // Include books relation
      select: ['id', 'name', 'description', 'createdAt'],
    });
  }

  async findOne(id: number) {
    const category = await this.categoryRepository.findOne({
      where: { id: Number(id) },
      relations: ['book'], // Include books relation
      select: ['id', 'name', 'description', 'createdAt'],
    });
    if (!category) {
      throw new Error(`Category with id ${id} not found`);
    }
    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoryRepository.findOne({
      where: { id: Number(id) },
    });
    if (!category) {
      throw new Error(`Category with id ${id} not found`);
    }
    // Update the category properties
    category.name = updateCategoryDto.name || category.name;
    category.description =
      updateCategoryDto.description || category.description;

    return this.categoryRepository.save(category);
  }

  async remove(id: number) {
    const category = await this.categoryRepository.findOne({
      where: { id: Number(id) },
    });
    if (!category) {
      throw new Error(`Category with id ${id} not found`);
    }
    return this.categoryRepository.remove(category);
  }
}
