import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { afterEach, beforeEach, describe, it } from 'vitest';
import { AppModule } from 'src/app/app.module';

/**
 * Tests for the custom headers middleware.
 */
describe('HeaderMiddleware', () => {
  let app: INestApplication;

  // Set up the NestJS application before each test
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule], // Import your application module
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  // Close the application after each test
  afterEach(async () => {
    await app.close();
  });

  // Test that the X-Version header is added to the response
  it('should add X-Version header to response', async () => {
    await request(app.getHttpServer()).get('/').expect('X-Version', /./); // Verify if the header exists, regardless of its value
  });

  // Test that the x-powered-by header is removed from the response
  it('should remove x-powered-by header from response', async () => {
    await request(app.getHttpServer())
      .get('/')
      .expect((res) => {
        if ('x-powered-by' in res.headers) {
          throw new Error('x-powered-by header still exists');
        }
      });
  });
});
