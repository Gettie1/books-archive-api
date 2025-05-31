import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from 'src/profiles/entities/profile.entity';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);
    if (createUserDto.profile) {
      const profile = this.profileRepository.create(createUserDto.profile);
      user.profile = profile;
    }
    return this.userRepository.save(user);
  }

  async findAll() {
    if (!this.userRepository) {
      throw new Error('UserRepository is not defined');
    }
    return this.userRepository.find({
      relations: ['profile'], // Include profile relation
      select: {
        id: true,
        name: true,
        email: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
        profile: {
          id: true,
          bio: true,
          avatar: true,
          dateOfBirth: true,
          location: true,
          createdAt: true,
        },
      },
    });
  }

  async findOne(id: number) {
    return this.userRepository.findOne({
      where: { id: id.toString() },
      relations: ['profile'], // Include profile relation
      select: {
        id: true,
        name: true,
        email: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
        profile: {
          id: true,
          bio: true,
          avatar: true,
          dateOfBirth: true,
          location: true,
          createdAt: true,
        },
      },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto).then(() => {
      return this.userRepository.findOne({
        where: { id: id.toString() },
        relations: ['profile'], // Include profile relation
        select: {
          id: true,
          name: true,
          email: true,
          isActive: true,
          createdAt: true,
          updatedAt: true,
          profile: {
            id: true,
            bio: true,
            avatar: true,
            dateOfBirth: true,
            location: true,
            createdAt: true,
          },
        },
      });
    });
  }

  async remove(id: number) {
    return this.userRepository.delete(id).then(() => {
      return { message: `User with ID ${id} deleted successfully` };
    });
  }
}
