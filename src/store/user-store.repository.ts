import { Injectable } from '@nestjs/common';
import { UserEntity } from '../user/user.entity';

@Injectable()
export class UserStore {
  private users: UserEntity[];

  constructor() {
    this.users = [
      {
        id: 'd81f65b7-6126-45c8-8009-1525014e6537',
        email: 'joh11n@gmail.com',
        password:
          '$2b$10$Z31MVNXbJ.uCN466Duazou6mQ5QfoUjcB4THqu5AxZr0qcC71Sseu',
      },
    ];
  }

  getUsers() {
    return this.users;
  }

  addUser(newUser: UserEntity) {
    this.users = this.users.concat([newUser]);
  }

  findUserById(id: string) {
    return this.users.find((currUser) => currUser.id === id);
  }
  findUserByEmail(email: string) {
    return this.users.find((currUser) => currUser.email === email);
  }
}
