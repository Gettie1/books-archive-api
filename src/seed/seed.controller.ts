import {
  Controller,
  // Get,
  Post,
  // Body,
  // Patch,
  // Param,
  // Delete,
  HttpCode,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { SeedService } from './seed.service';
// import { CreateSeedDto } from './dto/create-seed.dto';
// import { UpdateSeedDto } from './dto/update-seed.dto';

@Controller('seed')
export class SeedController {
  private readonly logger = new Logger(SeedController.name);
  constructor(private readonly seedService: SeedService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  seed() {
    this.logger.log('Seeding the database...');
    // try {
    //   const result = await this.seedService.seed();
    //   this.logger.log('Database seeded successfully');
    //   return result;
    // } catch (error: any) {
    //   this.logger.error('Error seeding the database', error?.message || error);
    //   throw error; // Re-throw the error to be handled by global exception filter
    // }
  }
}
