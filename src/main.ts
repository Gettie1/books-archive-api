import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );
  const configService = app.get<ConfigService>(ConfigService);

  const port = configService.get<number>('PORT') ?? 3000;
  await app.listen(port, () => {
    console.log(`Application is running on: http://localhost:${port}`);
  });
}
void bootstrap();
