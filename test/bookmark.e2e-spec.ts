import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { BookmarkModule } from './../src/bookmark/bookmark.module';

describe('BookmarkController', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, BookmarkModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', async () => {
    const response = await request(app.getHttpServer()).get('/bookmark');
    expect(response.statusCode).toBe(200);
    expect(response.body).toBe([]);
  });

  it('/ (POST)', async () => {
    const response = await request(app.getHttpServer()).post('/bookmark').send({
      name: 'test',
      description: 'test-description',
      url: 'testurl.com',
    });
    expect(response.statusCode).toBe(201);
    const responseBody = response.body;
    expect(responseBody.id).toBeDefined();
    expect(responseBody).toMatchObject({
      name: 'test',
      description: 'test-description',
      url: 'test.com',
    });
  });
});
