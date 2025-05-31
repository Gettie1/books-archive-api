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
    // Convert id to number if present to match Profile entity type
    const createProfileData = {
      ...createProfileDto,
      id: createProfileDto.id ? Number(createProfileDto.id) : undefined,
    };
    const profile = this.profileRepository.create(createProfileData);
    if (createProfileDto.id) {
      const user = await this.userRepository.findOne({
        where: { id: Number(createProfileDto.id) },
      });
      if (!user) {
        throw new NotFoundException(
          `User with id ${createProfileDto.id} not found`,
        );
      }
      profile.user = user; // Associate the profile with the user
    }
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
    // Convert id to number if present to match Profile entity type
    const updateProfileData = {
      ...updateProfileDto,
      id: updateProfileDto.id ? Number(updateProfileDto.id) : undefined,
    };
    const updatedProfile = this.profileRepository.merge(
      profile,
      updateProfileData,
    );
    return await this.profileRepository.save(updatedProfile);
  }

  async remove(id: number) {
    const profile = await this.profileRepository.findOne({
      where: { id: Number(id) },
    });
    if (!profile) {
      throw new NotFoundException(`Profile with id ${id} not found`);
    }
    // Optionally, you can also remove the user associated with the profile
    // await this.userRepository.delete(profile.user.id);
    return await this.profileRepository.remove(profile);
  }
}
