import { IsString, IsBoolean } from 'class-validator';
import { Entity } from 'typeorm';
@Entity()
export class CreateBookDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  publicationY: string;

  @IsBoolean()
  isAvailable: boolean;
}
