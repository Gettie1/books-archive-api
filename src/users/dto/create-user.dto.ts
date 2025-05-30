//  id: Unique identifier (UUID)
//  name: Unique user name
//  email: User's email address (unique)
//  password: Hashed password

import { IsBoolean, IsEmail, IsString, IsUUID, Length } from 'class-validator';
import { CreateProfileDto } from 'src/profiles/dto/create-profile.dto';

//  isActive: Account status (default: true
export class CreateUserDto {
  @IsUUID()
  name: string;
  @IsEmail()
  email: string;
  @IsString()
  @Length(8)
  password: string;
  @IsBoolean()
  isActive?: boolean = true;
  profile?: CreateProfileDto; // Optional profile data
}
