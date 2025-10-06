// --- Bootstrap root Nest app: จุดเริ่มระบบ + CORS + Swagger
import { NestFactory } from '@nestjs/core';
import { AppModule } from './presentation/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';


async function bootstrap() {
  // ทำ DI Container และโมดูลกราฟขึ้นมา
  const app = await NestFactory.create(AppModule);

  // CORS: อ่าน origin จาก env เพื่อให้ FE ที่ deploy อยู่ต่างโดเมนเรียกได้
  app.enableCors({
    origin: process.env.FRONTEND_ORIGINS?.split(',') ?? ['http://localhost:3000'],
    credentials: true,
  });

  // Swagger: ใช้สำหรับ dev/test/documentation อย่างเร็วๆ
  const config = new DocumentBuilder()
    .setTitle('Nextflix API')
    .setVersion('1.0')
    .addBearerAuth() // เผื่อภายหลังจะเพิ่ม JWT Auth
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  // เริ่มฟัง port (ใช้ 3001 เป็นค่าเริ่มต้น เพราะ 3000 เป็นของ FE)
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();


