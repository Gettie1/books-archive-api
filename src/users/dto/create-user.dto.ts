//  id: Unique identifier (UUID)
//  name: Unique user name
//  email: User's email address (unique)
//  password: Hashed password

import {
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateProfileDto } from 'src/profiles/dto/create-profile.dto';

//  isActive: Account status (default: true
export class CreateUserDto {
  @IsString()
  name: string;
  @IsEmail()
  email: string;
  @IsString()
  @Length(8)
  password: string;
  @IsBoolean()
  @IsOptional()
  isActive?: boolean = true;
  @IsOptional()
  @ValidateNested()
  @Type(() => CreateProfileDto)
  profile?: CreateProfileDto; // Optional profile data
}
