import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { Bookmark } from '@prisma/client';
import { User } from '../user/user.decorator';
import { BookmarkService } from './bookmark.service';
import { CreateBookmarkDTO } from './dto/create-bookmark.dto';
import { JwtAuthGuard } from './../jwt-auth-guard/jwt-auth.guard';
import { JwtPayload } from '../jwt-auth-strategy/jwt-payload';

@Controller('bookmark')
@UseGuards(JwtAuthGuard)
export class BookmarkController {
  constructor(private readonly bookmarkService: BookmarkService) {}

  @Post()
  createBookmark(
    @Body() bookMarkToCreate: CreateBookmarkDTO,
    @User() user: JwtPayload,
  ): Promise<Bookmark> {
    return this.bookmarkService.saveBookmark(bookMarkToCreate, user.id);
  }
}
