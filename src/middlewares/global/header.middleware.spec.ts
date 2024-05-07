import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { afterEach, beforeEach, describe, it } from 'vitest';
import { AppModule } from 'src/app/app.module';

/**
 * Pruebas para el middleware de encabezados personalizados.
 */
describe('HeaderMiddleware', () => {
  let app: INestApplication;

  // Configura la aplicación NestJS antes de cada prueba
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule], // Importa tu módulo de aplicación
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  // Cierra la aplicación después de cada prueba
  afterEach(async () => {
    await app.close();
  });

  // Prueba que se agregue el header X-Version a la respuesta
  it('should add X-Version header to response', async () => {
    await request(app.getHttpServer()).get('/').expect('X-Version', /./); // Verifica si el encabezado existe, independientemente de su valor
  });

  // Prueba que se elimine el header x-powered-by de la respuesta
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
