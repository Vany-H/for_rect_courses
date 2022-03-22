import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { useContainer } from 'typeorm';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const whitelist = process.env.WHITELIST_ADDRESS.split(' ');
  app.enableCors({
    credentials: true,
    origin: function (origin, callback) {
      callback(null, true);
    },
  });

  const config = new DocumentBuilder()
    .setTitle('DSOD - Digital Signature Of Documents')
    .setDescription('DSOD for all')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  await app.listen(process.env.PORT, () => {
    Logger.log(`Server start on ${process.env.PORT} port`);
    Logger.log(
      `Feature Swagger \x1b[33mhttp://localhost:${process.env.PORT}/api/docs`,
    );
  });
}
bootstrap();
