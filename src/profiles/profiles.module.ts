import { Module } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { ProfilesController } from './profiles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import { DatabaseModule } from 'src/database/database.module';
import { User } from 'src/users/entities/user.entity'; // Assuming you have a User entity in users module

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([Profile, User])],
  controllers: [ProfilesController],
  providers: [ProfilesService],
})
export class ProfilesModule {}
