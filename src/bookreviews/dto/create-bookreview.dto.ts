import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreateBookreviewDto {
  @IsString()
  content: string; // Review content
  @IsNumber()
  rating: number;
  @IsDate()
  createdAt: string;
}
