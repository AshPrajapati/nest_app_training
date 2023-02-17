import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import { ConfigService } from '@nestjs/config/dist';
import { Injectable } from '@nestjs/common';
import { validate } from './../core/env.validation';
import { JwtPayload } from './jwt-payload';
import { plainToClass } from 'class-transformer';
@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('SECRET_KEY'),
    } as StrategyOptions);
  }

  async validate(payload: any) {
    return plainToClass(JwtPayload, payload, {
      excludeExtraneousValues: true,
    });
  }
}
