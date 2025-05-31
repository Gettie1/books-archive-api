import { Module } from '@nestjs/common';
import { BookreviewsService } from './bookreviews.service';
import { BookreviewsController } from './bookreviews.controller';
import { DatabaseModule } from 'src/database/database.module';
import { Bookreview } from './entities/bookreview.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Book } from 'src/books/entities/book.entity'; // Assuming you have a Book entity in books module

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([Bookreview, User, Book])], // Add your entities here if needed
  controllers: [BookreviewsController],
  providers: [BookreviewsService],
})
export class BookreviewsModule {}
