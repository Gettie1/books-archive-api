import { IsNumber, IsString } from 'class-validator';

export class CreateBookreviewDto {
  @IsString()
  content: string; // Review content
  @IsNumber()
  rating: number;
  @IsString()
  createdAt: Date; // Creation date of the review
  @IsString()
  userId: string; // User ID as a string
  @IsString()
  bookId: string; // Book ID as a string
}
