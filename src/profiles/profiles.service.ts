import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Profile } from './entities/profile.entity';
import { User } from 'src/users/entities/user.entity'; // Assuming User is an entity defined in your project

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
      throw new BadRequestException(
        `Profile with id ${createProfileDto.Id} already exists`,
      );
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
