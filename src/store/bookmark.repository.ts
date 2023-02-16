import { Injectable } from '@nestjs/common';
import { BookMarkEntity } from './../bookmark/bookmark.entity';

@Injectable()
export class BookMarkRepository {
  bookMarks: BookMarkEntity[] = [];

  save(newBookMark: BookMarkEntity) {
    this.bookMarks.push(newBookMark);
  }
  getAll(): BookMarkEntity[] {
    return this.bookMarks;
  }

  getById(id: string) {
    return this.bookMarks.find((currBookMark) => currBookMark.id === id);
  }

  delete(id: string) {
    const foundBookMarkIndex = this.bookMarks.findIndex(
      (currBookMark) => currBookMark.id === id,
    );
    if (foundBookMarkIndex === -1) {
      throw new Error('Bookmark not found');
    }
    this.bookMarks = this.bookMarks.filter(
      (currBookMark) => currBookMark.id !== id,
    );
  }
}
