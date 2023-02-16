import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { BookMarkEntity } from './bookmark.entity';
import { BookMarkService } from './bookmark.service';

@Controller('bookmarks')
export class BookMarkController {
  constructor(private readonly bookMarkService: BookMarkService) {}

  @Post('/')
  save(@Body() newBookMark: BookMarkEntity) {
    return this.bookMarkService.save(newBookMark);
  }

  @Get('/')
  getAllBookMarks() {
    return this.bookMarkService.getAllBookMarks();
  }

  @Get('/:id')
  getBookMarkById(id: string) {
    return this.bookMarkService.getBookMarkById(id);
  }

  @Delete('/:id')
  deleteBookMarkById(id: string) {
    return this.bookMarkService.deleteBookMarkById(id);
  }
}
