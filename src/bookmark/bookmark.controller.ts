import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators';
import { JwtAuthGuard } from 'src/jwt-auth-guard/jwt-auth.guard';
import { JwtPayload } from 'src/jwt-auth-strategy/jwt-payload';
import { User } from 'src/user/user.decorator';
import BookMarkDTO from './bookmark.dto';
import BookMarkService from './bookmark.service';

@UseGuards(JwtAuthGuard)
@Controller('bookmarks')
export default class BookMarkController {
  constructor(private readonly bookMarkService: BookMarkService) {}

  @Get()
  getAllBookmarks(@User() user: JwtPayload) {
    console.log('this is user ', user);
    return this.bookMarkService.getBookMarks(user.id);
  }

  @Post()
  addBookMark(@Body() bookMarkBody: BookMarkDTO, @User() user: JwtPayload) {
    return this.bookMarkService.addBookMark(bookMarkBody, user.id);
  }

  @Get(':id')
  getBookMarkById(@Param() params, @User() user: JwtPayload) {
    return this.bookMarkService.getBookMarkById(params.id, user.id);
  }

  @Put(':id')
  updateBookMarkById(
    @Param() params,
    @User() user: JwtPayload,
    @Body() bookMarkData: BookMarkDTO,
  ) {
    return this.bookMarkService.updateBookMark(
      params.id,
      user.id,
      bookMarkData,
    );
  }

  @Delete(':id')
  deleteBookMarkById(@Param() params, @User() user: JwtPayload) {
    return this.bookMarkService.deleteBookMark(params.id, user.id);
  }
}
