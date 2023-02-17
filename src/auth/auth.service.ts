import { BadRequestException, Injectable } from '@nestjs/common';

import { compareSync, hashSync } from 'bcrypt';
import { randomUUID } from 'crypto';

import { JwtService } from '@nestjs/jwt/dist';
import { UserStore } from '../store/user-store.repository';
import { AuthDTO } from './auth.dto';
import { UserEntity } from '../user/user.entity';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export default class AuthService {
  constructor(
    private readonly userStore: UserStore,
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
  ) {}

  async signupUser(authData: AuthDTO) {
    const { email, password } = authData;

    const foundUserWithEmail = await this.prismaService.user.findFirst({
      where: { email },
    });
    if (foundUserWithEmail) {
      throw new BadRequestException('Entered email is already exists!');
    }

    const hashedPassword = hashSync(password, 10);
    return this.prismaService.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
  }

  async signInUser(authData: AuthDTO) {
    const { email, password } = authData;

    const foundUser = await this.prismaService.user.findFirst({
      where: { email },
    });
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
