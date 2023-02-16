import { Injectable } from '@nestjs/common';
import { UserEntity } from './../user/user.entity';

@Injectable()
export class UserStoreRepository {
  users: UserEntity[] = [];
  save(user: UserEntity) {
    if (this.getByEmail(user.email)) {
      throw new Error('User Email is already in use');
    }
    this.users.push(user);
  }

  getByEmail(email: string) {
    return this.users.find((currUser) => currUser.email === email);
  }

  getById(id: string) {
    return this.users.find((currUser) => currUser.id === id);
  }
}
