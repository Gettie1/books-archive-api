import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreateAuthorDto {
  @IsString()
  @IsOptional()
  authorId: string; // Assuming this is a unique identifier for the author
  @IsString()
  name: string;
  @IsString()
  @IsOptional()
  bio: string;
  @IsString()
  birthDate: string;
  @IsBoolean()
  isActive: boolean;
}
