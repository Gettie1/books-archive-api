import { Test, TestingModule } from '@nestjs/testing';
import { BookreviewsService } from './bookreviews.service';

describe('BookreviewsService', () => {
  let service: BookreviewsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookreviewsService],
    }).compile();

    service = module.get<BookreviewsService>(BookreviewsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
