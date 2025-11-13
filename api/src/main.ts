import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // Cookie parser с секретом для signed cookies
    const cookieSecret = process.env.COOKIE_SECRET || 'dev-secret-change-me';
    app.use(cookieParser(cookieSecret));

    // Security & CORS
    app.use(helmet());
    app.enableCors({
        origin: process.env.CORS_ORIGIN?.split(',') || true,
        credentials: true
    });

    // Global validation
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
            transformOptions: { enableImplicitConversion: true },
        }),
    );

    // Versioning
    app.enableVersioning({ type: VersioningType.URI });

    // Swagger
    const config = new DocumentBuilder()
        .setTitle('Knowchain API')
        .setDescription('Gamified Crypto Education Platform API')
        .setVersion('1.0')
        .addCookieAuth('guestId', {
            type: 'apiKey',
            in: 'cookie',
            name: 'guestId',
        })
        .addCookieAuth('walletSession', {
            type: 'apiKey',
            in: 'cookie',
            name: 'walletSession',
        })
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);

    const port = process.env.PORT ?? 3000;
    await app.listen(port);
    console.log(`🚀 Application running on: http://localhost:${port}`);
    console.log(`📚 Swagger docs: http://localhost:${port}/docs`);
}
bootstrap();