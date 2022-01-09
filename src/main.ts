import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { addAlias } from 'module-alias'
import { resolve } from 'path'
import { ValidationPipe } from '@nestjs/common'
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface'
import Helmet from 'helmet'

addAlias('@', resolve(__dirname))

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const corsOptions: CorsOptions = {
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    preflightContinue: false,
    optionsSuccessStatus: 200,
  }

  app.enableCors(corsOptions)

  app.use(Helmet())

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  )
  await app.listen(3000)
}

bootstrap()
