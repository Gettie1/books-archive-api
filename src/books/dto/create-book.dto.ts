import { IsString, IsBoolean } from 'class-validator';
import { Entity } from 'typeorm';
@Entity()
export class CreateBookDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  publicationYear: string;

  @IsBoolean()
  isAvailable: boolean;
}
