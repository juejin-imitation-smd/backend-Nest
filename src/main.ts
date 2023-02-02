import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import session from 'express-session';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

const corsOptions: CorsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type,Accept',
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors(corsOptions);

  const options = new DocumentBuilder()
    .setTitle('Query comments example')
    .setDescription('The comments API description')
    .setVersion('1.0')
    .addTag('comments')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  app.use(
    session({
      secret: 'mysecretkey',
      resave: false,
      saveUninitialized: true,
      cookie: {
        maxAge: 36000000,
      },
    }),
  );

  await app.listen(3000);
}
bootstrap();
