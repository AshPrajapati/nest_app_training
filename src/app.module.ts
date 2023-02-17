import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { StoreModule } from './store/store.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { PokemonModule } from './pokemon/pokemon.module';
import { validate } from './core/env.validation';
import { PowerModule } from './power/power.module';
import { BookmarkModule } from './bookmark/bookmark.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      validate,
    }),
    UserModule,
    AuthModule,
    StoreModule,
    PrismaModule,
    PokemonModule,
    PowerModule,
    BookmarkModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
