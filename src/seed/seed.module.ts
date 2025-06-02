import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Profile } from 'src/profiles/entities/profile.entity';
import { Book } from 'src/books/entities/book.entity';
import { Category } from 'src/categories/entities/category.entity';
import { Bookreview } from 'src/bookreviews/entities/bookreview.entity';
import { Author } from 'src/authors/entities/author.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Profile,
      Book,
      Category,
      Bookreview,
      Author,
    ]),
  ], // Add your entities here if needed
  controllers: [SeedController],
  providers: [SeedService],
})
export class SeedModule {}
