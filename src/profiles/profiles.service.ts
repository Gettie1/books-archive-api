import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from './entities/profile.entity';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}
  async create(createProfileDto: CreateProfileDto) {
    const profileExists = await this.profileRepository.findOne({
      where: { id: createProfileDto.Id },
    });
    if (profileExists) {
      throw new BadRequestException(
        `Profile with id ${createProfileDto.Id} already exists`,
      );
    }
    const profile = this.profileRepository.create(createProfileDto);
    return this.profileRepository.save(profile);
  }

  async findAll(id?: string) {
    if (!this.profileRepository) {
      throw new Error('ProfileRepository is not defined');
    }
    if (id) {
      return this.profileRepository.findOne({
        where: { id },
        select: {
          id: true,
          bio: true,
          avatar: true,
          dateOfBirth: true,
          location: true,
          createdAt: true,
          user: {
            id: true,
            name: true,
            email: true,
            isActive: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      });
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} profile`;
  }

  update(id: number, updateProfileDto: UpdateProfileDto) {
    console.log(updateProfileDto);
    return `This action updates a #${id} profile`;
  }

  remove(id: number) {
    return `This action removes a #${id} profile`;
  }
}
