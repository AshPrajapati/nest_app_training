import { Injectable, UnauthorizedException } from '@nestjs/common';
import { BookMarkRepository } from './../store/bookmark.repository';
import { BookMarkEntity } from './bookmark.entity';

@Injectable()
export class BookMarkService {
  constructor(private readonly bookMarkRepository: BookMarkRepository) {}

  save(newBookMark: BookMarkEntity) {
    this.bookMarkRepository.save(newBookMark);
  }

  getAllBookMarks() {
    return this.bookMarkRepository.getAll();
  }

  getBookMarkById(id: string) {
    const bookMark = this.bookMarkRepository.getById(id);
    if (!bookMark) throw new UnauthorizedException('Invalid id');
    return bookMark;
  }

  deleteBookMarkById(id: string) {
    this.bookMarkRepository.delete(id);
  }
}
