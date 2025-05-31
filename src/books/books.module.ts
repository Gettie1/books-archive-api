import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { Book } from './entities/book.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { Author } from 'src/authors/entities/author.entity';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([Book, Author])], // Add your entities here
  controllers: [BooksController],
  providers: [BooksService],
  exports: [],
})
export class BooksModule {}
