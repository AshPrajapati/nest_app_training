import { Controller } from '@nestjs/common';
import { NotImplementedException } from '@nestjs/common/exceptions';
import { BookmarkService } from './bookmark.service';

@Controller('bookmark')
export class BookmarkController {
  constructor(private readonly bookmarkService: BookmarkService) {}

  createBookmark() {
    throw new NotImplementedException();
  }

  getAll() {
    return this.bookmarkService.findAll();
  }
}
