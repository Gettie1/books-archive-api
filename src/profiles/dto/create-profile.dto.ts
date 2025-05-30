import { IsOptional, IsString, IsDate } from 'class-validator';
export class CreateProfileDto {
  @IsString()
  @IsOptional()
  bio?: string;
  @IsString()
  @IsOptional()
  avatar?: string;
  @IsDate()
  @IsOptional()
  dateOfBirth?: Date;
  @IsString()
  @IsOptional()
  location?: string;
}
