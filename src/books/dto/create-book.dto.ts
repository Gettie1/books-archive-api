import { IsString, IsBoolean } from 'class-validator';

export class CreateBookDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  publicationYear: string;

  @IsBoolean()
  isAvailable: boolean;

  @IsString()
  authorId: number; // Assuming authorId is a string, adjust if it's a number
}
