import { Type } from 'class-transformer';
import {
  IsString,
  IsOptional,
  IsBoolean,
  ValidateNested,
} from 'class-validator';
import { CreateBookDto } from 'src/books/dto/create-book.dto';

export class CreateAuthorDto {
  @IsString()
  authorId: string; // Assuming this is a unique identifier for the author
  @IsString()
  name: string;
  @IsString()
  @IsOptional()
  bio: string | null; // Optional bio field
  @IsString()
  birthDate: string;
  @IsBoolean()
  isActive: boolean;
  @IsOptional()
  @ValidateNested()
  @Type(() => CreateBookDto)
  book?: CreateBookDto;
}
