import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, Module } from '@nestjs/common';
import request from 'supertest';
import { describe, beforeEach, afterEach, it, expect } from 'vitest';
import { HeaderMiddleware } from './header.middleware';

// Create a dummy controller to handle requests during testing
@Module({})
class TestModule {}

describe('HeaderMiddleware', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TestModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    // Register the HeaderMiddleware
    app.use((req, res, next) => new HeaderMiddleware().use(req, res, next));
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('should add X-Version header to response', async () => {
    const response = await request(app.getHttpServer()).get('/');
    expect(response.header['x-version']).toBe('1.0');
  });

  it('should remove x-powered-by header from response', async () => {
    const response = await request(app.getHttpServer()).get('/');
    expect(response.header['x-powered-by']).toBeUndefined();
  });
});
