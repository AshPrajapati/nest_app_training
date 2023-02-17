import { Injectable } from '@nestjs/common';
import { BookMarkEntity } from 'src/bookmark/bookmark.entity';

@Injectable()
export default class BookMarkStore {
  private bookmarks: BookMarkEntity[];
  constructor() {
    this.bookmarks = [
      {
        id: '5cd6adf1-a9e6-4448-87a5-ab3a470c3c44',
        description: 'description',
        name: 'Test',
        url: 'url',
        userId: '236ea4a6-e329-4ca8-9836-aeb15a3cffe4',
      },
    ];
  }

  getBookMarks() {
    return this.bookmarks;
  }

  addBookMark(newBookMark: BookMarkEntity) {
    this.bookmarks = this.bookmarks.concat([newBookMark]);
  }

  findBookMarkOfUserById(id: string, userId: string) {
    return this.bookmarks.find(
      (currBookMark) =>
        currBookMark.id === id && currBookMark.userId === userId,
    );
  }

  deleteBookMarkById(id: string, userId: string) {
    this.bookmarks = this.bookmarks.filter(
      (currBookMark) =>
        currBookMark.id !== id && currBookMark.userId !== userId,
    );
  }

  updateBookMarkById(
    id: string,
    userId: string,
    updatedBookMark: BookMarkEntity,
  ) {
    const bookMarkIdx = this.bookmarks.findIndex(
      (currBookMark) =>
        currBookMark.id === id && currBookMark.userId === userId,
    );
    if (bookMarkIdx === -1) {
      return undefined;
    }
    this.bookmarks[bookMarkIdx] = updatedBookMark;
    return updatedBookMark;
  }
}
