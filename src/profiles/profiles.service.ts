import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Profile } from './entities/profile.entity';
import { User } from 'src/users/entities/user.entity'; // Assuming User is an entity defined in your project
// import {  Error } from 'console';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>, // Assuming User is an entity defined in your project
  ) {}
  async create(createProfileDto: CreateProfileDto) {
    const profileExists = await this.profileRepository.findOne({
      where: { id: Number(createProfileDto.Id) },
    });
    if (profileExists) {
      throw new Error(`Profile with id ${createProfileDto.Id} already exists`);
    }
    const profile = this.profileRepository.create(createProfileDto);
    return this.profileRepository.save(profile);
  }

  async findAll(id?: string[]) {
    if (id && id.length > 0) {
      const profiles = await this.profileRepository.findBy({
        id: In(id.map((profileId) => Number(profileId))),
      });
      return profiles;
    }
    return this.profileRepository.find();
  }

  async findOne(id: number) {
    const profile = await this.profileRepository.findOne({
      where: { id: Number(id) },
      relations: ['user'], // Include user relation
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
    if (!profile) {
      throw new NotFoundException(`Profile with id ${id} not found`);
    }
    return profile;
  }

  async update(id: number, updateProfileDto: UpdateProfileDto) {
    const profile = await this.profileRepository.findOne({
      where: { id: Number(id) },
    });
    if (!profile) {
      throw new NotFoundException(`Profile with id ${id} not found`);
    }
    const updatedProfile = this.profileRepository.merge(
      profile,
      updateProfileDto,
    );
    return await this.profileRepository.save(updatedProfile);
  }

  remove(id: number) {
    return `This action removes a #${id} profile`;
  }
}
