import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AuthDTO } from '../src/auth/auth.dto';
import { CreateBookmarkDTO } from '../src/bookmark/dto/create-bookmark.dto';
import { PrismaService } from '../src/prisma/prisma.service';
import { AppModule } from './../src/app.module';

describe('BookmarkController (e2e)', () => {
  let app: INestApplication;
  let token: string;
  let prismaService: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const user: AuthDTO = {
      email: 'john@gmail.com',
      password: 'TEst@12345',
    };

    prismaService = moduleFixture.get(PrismaService);
    await prismaService.bookmark.deleteMany();
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

  beforeEach(async () => {
    await prismaService.bookmark.deleteMany();
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

  describe('/ (GET)', () => {
    it('should return empty list if there is no bookmark of user', async () => {
      const response = await request(app.getHttpServer())
        .get('/bookmark')
        .set('Authorization', `Bearer ${token}`)
        .send();
      expect(response.statusCode).toBe(200);
      const responseBody = response.body;
      expect(responseBody).toHaveLength(0);
    });

    it.todo('should return list if there is a bookmark of user');
  });
});
