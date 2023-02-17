import { Injectable } from '@nestjs/common';
import { Bookmark } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BookmarkService {
  constructor(private readonly prismaService: PrismaService) {}
  findAll(): Promise<Bookmark[]> {
    return this.prismaService.bookmark.findMany();
  }
}
