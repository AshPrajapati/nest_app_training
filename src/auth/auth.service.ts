import { BadRequestException, Injectable } from '@nestjs/common';

import { compareSync, hashSync } from 'bcrypt';
import { randomUUID } from 'crypto';

import { JwtService } from '@nestjs/jwt/dist';
import { UserStore } from 'src/store/user-store.repository';
import { AuthDTO } from './auth.dto';
import { UserEntity } from 'src/user/user.entity';

@Injectable()
export default class AuthService {
  constructor(
    private readonly userStore: UserStore,
    private readonly jwtService: JwtService,
  ) {}

  signupUser(authData: AuthDTO) {
    const { email, password } = authData;

    const foundUserWithEmail = this.userStore.findUserByEmail(email);
    if (foundUserWithEmail) {
      throw new BadRequestException('Entered email is already exists!');
    }

    const hashedPassword = hashSync(password, 10);
    const newUser: UserEntity = {
      id: randomUUID(),
      email,
      password: hashedPassword,
    };
    this.userStore.addUser(newUser);

    console.log(newUser);

    return {
      id: newUser.id,
      email,
    };
  }

  signInUser(authData: AuthDTO) {
    const { email, password } = authData;

    const foundUser = this.userStore.findUserByEmail(email);
    if (!foundUser) {
      throw new BadRequestException('Invalid Email!');
    }
    if (!compareSync(password, foundUser.password)) {
      throw new BadRequestException('Invalid Password!');
    }
    const accessToken = this.jwtService.sign({ id: foundUser.id });

    return { accessToken };
  }
}
