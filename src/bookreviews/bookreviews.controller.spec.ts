import { Test, TestingModule } from '@nestjs/testing';
import { BookreviewsController } from './bookreviews.controller';
import { BookreviewsService } from './bookreviews.service';

describe('BookreviewsController', () => {
  let controller: BookreviewsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookreviewsController],
      providers: [BookreviewsService],
    }).compile();

    controller = module.get<BookreviewsController>(BookreviewsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
