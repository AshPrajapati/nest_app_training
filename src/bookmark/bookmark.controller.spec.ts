import { Test, TestingModule } from '@nestjs/testing';
import { BookmarkController } from './bookmark.controller';
import { CreateBookmarkDTO } from 'src/bookmark/dto/create-bookmark.dto';
import { BookmarkService } from './bookmark.service';

describe('BookmarkController', () => {
  let controller: BookmarkController;
  let bookmarkService: BookmarkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookmarkController],
      providers: [
        {
          provide: BookmarkService,
          useFactory: () => {
            return {
              saveBookmark: jest.fn(),
            };
          },
        },
      ],
    }).compile();

    controller = module.get<BookmarkController>(BookmarkController);
    bookmarkService = module.get<BookmarkService>(BookmarkService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a bookmark', async () => {
    const bookMarkToCreate: CreateBookmarkDTO = {
      name: 'test',
      description: 'test description',
      url: 'test url',
    };
    const userId = 'userId';

    jest.spyOn(bookmarkService, 'saveBookmark').mockResolvedValueOnce({
      id: '1',
      userId,
      ...bookMarkToCreate,
    });

    const result = await controller.createBookmark(bookMarkToCreate, userId);
    expect(bookmarkService.saveBookmark).toBeCalledTimes(1);
    expect(bookmarkService.saveBookmark).toBeCalledWith(
      bookMarkToCreate,
      userId,
    );
    expect(result).toMatchObject(bookMarkToCreate);
    expect(result.id).toBeDefined();
    expect(result.userId).toEqual(userId);
  });
});
