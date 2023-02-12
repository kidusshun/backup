import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';


async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});
  // const corsOptions: CorsOptions = {
  //   origin: 'http://localhost:3000',
  //   optionsSuccessStatus: 200
  // };
  // app.enableCors(corsOptions);
  app.useGlobalPipes( new ValidationPipe({whitelist:true}));
  await app.listen(3333);
}
bootstrap();
