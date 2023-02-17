import { Injectable } from '@nestjs/common';
import { Bookmark } from '@prisma/client';
import { CreateBookmarkDTO } from './dto/create-bookmark.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BookmarkService {
  constructor(private readonly prismaService: PrismaService) {}
  getAllBookmarks(userId: string): Promise<Bookmark[]> {
    return this.prismaService.bookmark.findMany({
      where: { userId },
    });
  }

  saveBookmark(
    bookmarkToSave: CreateBookmarkDTO,
    userId: string,
  ): Promise<Bookmark> {
    return this.prismaService.bookmark.create({
      data: {
        ...bookmarkToSave,
        userId,
      },
    });
  }
}
