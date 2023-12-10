import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(
    {
      origin: '*', // or your Angular app's URL
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    }
  );
  const port = process.env.PORT || 3333;
    await app.listen(port);
    Logger.log(
        `🚀 Application is running on: http://localhost:${port}/api/`
    );
}
bootstrap();
