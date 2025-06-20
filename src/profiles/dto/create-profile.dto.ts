// import { Type } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';
export class CreateProfileDto {
  @IsOptional()
  @IsString()
  id?: number;
  @IsString()
  @IsOptional()
  @IsString()
  bio?: string;
  @IsString()
  @IsOptional()
  avatar?: string;
  // @IsOptional()
  // @Type(() => Date)
  // @IsDate()
  @IsString()
  dateOfBirth?: string;
  @IsOptional()
  location?: string;
}
