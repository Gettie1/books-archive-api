import { IsOptional, IsString } from 'class-validator';
export class CreateProfileDto {
  @IsString()
  Id: string;
  @IsString()
  @IsOptional()
  @IsString()
  bio?: string;
  @IsString()
  @IsOptional()
  avatar?: string;
  @IsString()
  @IsOptional()
  dateOfBirth?: string;
  @IsOptional()
  location?: string;
}
