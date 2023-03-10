import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { ConfigService } from '@nestjs/config/dist';
import { PassportModule } from '@nestjs/passport';
import { JwtAuthStrategy } from '../jwt-auth-strategy/jwt-auth-strategy';
import AuthService from './auth.service';
import AuthController from './auth.controller';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory(configService: ConfigService) {
        return {
          secret: configService.get('SECRET_KEY'),
          signOptions: {
            expiresIn: '60Mins',
          },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtAuthStrategy],
  exports: [AuthService],
})
export class AuthModule {}
