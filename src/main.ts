// --- Bootstrap root Nest app: จุดเริ่มระบบ + CORS + Swagger
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './presentation/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configuredOrigins =
    process.env.FRONTEND_ORIGINS?.split(',')
      .map((origin) => origin.trim())
      .filter((origin) => origin.length > 0) ?? [];

  const defaultOrigins = ['http://localhost:3000', 'http://127.0.0.1:3000', 'http://localhost:3002'];

  app.enableCors({
    origin: configuredOrigins.length > 0 ? configuredOrigins : defaultOrigins,
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('Nextflix API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT ?? 3001);
}

void bootstrap();
