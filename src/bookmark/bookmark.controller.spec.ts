import { Test, TestingModule } from '@nestjs/testing';
import { BookmarkController } from './bookmark.controller';
import { CreateBookmarkDTO } from 'src/bookmark/dto/create-bookmark.dto';
import { BookmarkService } from './bookmark.service';
import { JwtPayload } from './../jwt-auth-strategy/jwt-payload';

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
              getAllBookmarks: jest.fn(),
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

    const result = await controller.createBookmark(bookMarkToCreate, {
      id: userId,
    } as JwtPayload);
    expect(bookmarkService.saveBookmark).toBeCalledTimes(1);
    expect(bookmarkService.saveBookmark).toBeCalledWith(
      bookMarkToCreate,
      userId,
    );
    expect(result).toMatchObject(bookMarkToCreate);
    expect(result.id).toBeDefined();
    expect(result.userId).toEqual(userId);
  });

  it('should return empty list of bookmark if user has no bookmark', async () => {
    const jwtPayload: JwtPayload = { id: 'id' };
    jest.spyOn(bookmarkService, 'getAllBookmarks').mockResolvedValueOnce([]);
    const result = await controller.getAllBookmarks(jwtPayload);
    expect(result).toHaveLength(0);
    expect(bookmarkService.getAllBookmarks).toBeCalledTimes(1);
    expect(bookmarkService.getAllBookmarks).toBeCalledWith(jwtPayload.id);
  });
});
