import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma/prisma.service';
import { BookmarkService } from './bookmark.service';

describe('Bookmark', () => {
  let service: BookmarkService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: PrismaService,
          useFactory: () => {
            return {
              bookmark: {
                findMany: jest.fn(),
              },
            };
          },
        },
      ],
    }).compile();

    service = module.get<BookmarkService>(BookmarkService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should return list of bookmarks', async () => {
    jest.spyOn(prismaService.bookmark, 'findMany').mockResolvedValueOnce([]);
    const result = await service.findAll();
    expect(prismaService.bookmark.findMany).toBeCalledTimes(1);
    expect(result).toMatchObject([]);
  });
});
