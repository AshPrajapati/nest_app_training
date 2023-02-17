import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayload } from 'src/jwt-auth-strategy/jwt-payload';

export const User = createParamDecorator(
  (_: unknown, ctx: ExecutionContext): JwtPayload => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
