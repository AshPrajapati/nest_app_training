import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { randomUUID } from 'crypto';
import BookMarkStore from 'src/store/bookmark.repository';
import { UserStore } from 'src/store/user-store.repository';
import { UserEntity } from 'src/user/user.entity';
import BookMarkDTO from './bookmark.dto';
import { BookMarkEntity } from './bookmark.entity';

@Injectable()
export default class BookMarkService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userStore: UserStore,
    private readonly bookMarkStore: BookMarkStore,
  ) {}

  private getUserFromAuthorizationHeader(
    authorizationHeader: string,
  ): UserEntity {
    if (!authorizationHeader) {
      throw new UnauthorizedException('Access Denied!');
    }
    const [, token] = authorizationHeader.split(' ');
    if (!token) {
      throw new UnauthorizedException('Access Denied!');
    }
    const user = this.jwtService.decode(token);
    if (typeof user === 'string' || (user && !user.id)) {
      throw new BadRequestException('Please Login Again!');
    }
    return this.userStore.findUserById(user.id);
  }

  addBookMark(bookMarkData: BookMarkDTO, userId: string) {
    const { description, name, url } = bookMarkData;
    const foundUser = this.userStore.findUserById(userId);
    if (!foundUser) {
      throw new NotFoundException('User not found!');
    }
    const newBookMark: BookMarkEntity = {
      description,
      id: randomUUID(),
      name,
      url,
      userId: foundUser.id,
    };
    this.bookMarkStore.addBookMark(newBookMark);
    return newBookMark;
  }

  getBookMarks(userId: string) {
    const foundUser = this.userStore.findUserById(userId);
    if (!foundUser) {
      throw new NotFoundException('User not found!');
    }
    return this.bookMarkStore
      .getBookMarks()
      .filter((currBookMark) => currBookMark.userId === foundUser.id);
  }

  getBookMarkById(id: string, userId: string) {
    const foundUser = this.userStore.findUserById(userId);
    if (!foundUser) {
      throw new NotFoundException('User not found!');
    }
    const foundBookMark = this.bookMarkStore.findBookMarkOfUserById(
      id,
      foundUser.id,
    );
    if (!foundBookMark) {
      throw new NotFoundException('BookMark not found!');
    }
    return foundBookMark;
  }

  deleteBookMark(id: string, userId: string) {
    const foundUser = this.userStore.findUserById(userId);
    if (!foundUser) {
      throw new NotFoundException('User not found!');
    }
    const foundBookMark = this.bookMarkStore.findBookMarkOfUserById(
      id,
      foundUser.id,
    );
    if (!foundBookMark) {
      throw new NotFoundException('Bookmark Not Found!');
    }
    this.bookMarkStore.deleteBookMarkById(id, foundUser.id);
  }

  updateBookMark(id: string, userId: string, bookMarkData: BookMarkDTO) {
    const foundUser = this.userStore.findUserById(userId);
    if (!foundUser) {
      throw new NotFoundException('User not found!');
    }
    const foundBookMark = this.bookMarkStore.findBookMarkOfUserById(
      id,
      foundUser.id,
    );
    if (!foundBookMark) {
      throw new NotFoundException('BookMark Not Found!');
    }
    const updatedBookMark = { ...foundBookMark, ...bookMarkData };
    return this.bookMarkStore.updateBookMarkById(
      id,
      foundUser.id,
      updatedBookMark,
    );
  }
}
