import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { DatabaseModule } from 'src/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Book } from 'src/books/entities/book.entity'; // Assuming you have a Book entity in books module

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([Category, Book])], // Add your entities here if needed
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
