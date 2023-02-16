import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { UserStoreRepository } from '../store/user-store.repository';
import { AuthDTO } from './auth.dto';
import { UserEntity } from './../user/user.entity';
import { compareSync, hashSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt/dist';
@Injectable()
export class AuthService {
  constructor(
    private readonly userStore: UserStoreRepository,
    private readonly jwtService: JwtService,
  ) {}

  signup(authData: AuthDTO) {
    const foundUser = this.userStore.getByEmail(authData.email);
    if (foundUser) throw new BadRequestException('Email Already exist');
    const hashedPassword = hashSync(authData.password, 10);
    const user: UserEntity = {
      id: '123',
      email: authData.email,
      password: hashedPassword,
    };

    this.userStore.save(user);
    return { message: 'User successfully signed up' };
  }

  async signin(authData: AuthDTO) {
    const user = this.userStore.getByEmail(authData.email);
    if (!user) {
      throw new UnauthorizedException('Invalid Email id');
    }

    if (!compareSync(authData.password, user.password)) {
      throw new UnauthorizedException('Invalid Password');
    }
    const accessToken = await this.jwtService.signAsync({
      id: user.id,
      email: user.email,
    });

    return { accessToken };
  }
}
