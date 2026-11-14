import 'reflect-metadata';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: process.env.CLIENT_ORIGIN?.split(',') || true });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.setGlobalPrefix('api');
  app.getHttpAdapter().get('/health', (_req: unknown, res: { json: (body: unknown) => void }) => res.json({ ok: true, service: 'odd-api' }));
  await app.listen(Number(process.env.PORT || 4000), '0.0.0.0');
}

bootstrap();
