import { Test, TestingModule } from '@nestjs/testing';
import { BookmarkController } from './bookmark.controller';
import { BookmarkService } from './bookmark.service';

describe('BookmarkController', () => {
  let controller: BookmarkController;
  let service: BookmarkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookmarkController],
      providers: [
        {
          provide: BookmarkService,
          useFactory: () => {
            return {
              findAll: jest.fn(),
            };
          },
        },
      ],
    }).compile();

    controller = module.get<BookmarkController>(BookmarkController);
    service = module.get<BookmarkService>(BookmarkService);
  });

  it('should return list of book mark', async () => {
    jest.spyOn(service, 'findAll').mockResolvedValueOnce(Promise.all([]));
    const response = await controller.getAll();
    expect(service.findAll).toBeCalledTimes(1);
    expect(response).toMatchObject([]);
  });

  it('should create bookmark', async () => {
    // const response = await controller.createBookmark();
    // expect(response).toBe(201);
  });
});
