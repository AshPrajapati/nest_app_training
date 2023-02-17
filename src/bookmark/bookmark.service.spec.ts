import { Test, TestingModule } from '@nestjs/testing';
import { BookmarkService } from './bookmark.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookmarkDTO } from './dto/create-bookmark.dto';
import { Bookmark } from '@prisma/client';

describe('Bookmark', () => {
  let bookmarkService: BookmarkService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookmarkService,
        {
          provide: PrismaService,
          useFactory: () => {
            return {
              bookmark: {
                create: jest.fn(),
                findMany: jest.fn(),
              },
            };
          },
        },
      ],
    }).compile();

    bookmarkService = module.get<BookmarkService>(BookmarkService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(bookmarkService).toBeDefined();
  });
  it('should create bookmark', async () => {
    const bookmark: CreateBookmarkDTO = {
      name: 'test',
      description: 'test Description',
      url: 'test url',
    };

    const mockedBookmark: Bookmark = {
      id: 'id',
      userId: 'userId',
      ...bookmark,
    };

    jest
      .spyOn(prismaService.bookmark, 'create')
      .mockResolvedValue(mockedBookmark);

    const result = await bookmarkService.saveBookmark(bookmark, 'userId');
    expect(prismaService.bookmark.create).toBeCalledTimes(1);
    expect(prismaService.bookmark.create).toBeCalledWith({
      data: {
        ...bookmark,
        userId: 'userId',
      },
    });
    expect(result.id).toBeDefined();
    expect(result.userId).toEqual('userId');
    expect(result).toMatchObject(bookmark);
  });

  it('should return empty list if user has no bookmarks', async () => {
    const userId = 'id';
    jest.spyOn(prismaService.bookmark, 'findMany').mockResolvedValueOnce([]);
    const result = await bookmarkService.getAllBookmarks(userId);
    expect(result).toHaveLength(0);
    expect(prismaService.bookmark.findMany).toBeCalledTimes(1);
    expect(prismaService.bookmark.findMany).toBeCalledWith({
      where: {
        userId,
      },
    });
  });
});
