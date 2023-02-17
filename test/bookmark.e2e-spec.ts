import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { BookmarkModule } from './../src/bookmark/bookmark.module';
import { CreateBookmarkDTO } from '../src/bookmark/dto/create-bookmark.dto';
import { AuthDTO } from '../src/auth/auth.dto';
import { PrismaService } from '../src/prisma/prisma.service';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let token: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [BookmarkModule, AppModule],
      providers: [PrismaService],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const user: AuthDTO = {
      email: 'john@gmail.com',
      password: 'TEst@12345',
    };

    const prismaService = moduleFixture.get(PrismaService);
    await prismaService.user.deleteMany({
      where: {
        email: user.email,
      },
    });

    await request(app.getHttpServer()).post('/auth/signup').send(user);
    const {
      body: { accessToken },
    } = await request(app.getHttpServer()).post('/auth/signin').send(user);
    token = accessToken;
  });

  it('/ (POST)', async () => {
    const createBookmark: CreateBookmarkDTO = {
      name: 'name',
      description: 'test desc',
      url: 'test url',
    };
    const response = await request(app.getHttpServer())
      .post('/bookmark')
      .set('Authorization', `Bearer ${token}`)
      .send(createBookmark);

    expect(response.statusCode).toBe(201);
    const responseBody = response.body;
    expect(responseBody.id).toBeDefined();
    expect(responseBody).toMatchObject(createBookmark);
  });
});
