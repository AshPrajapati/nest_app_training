import { Expose } from 'class-transformer';

export class JwtPayload {
  @Expose()
  id: string;
}
