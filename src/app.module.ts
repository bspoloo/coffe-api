import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeModule } from './coffe/coffe.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConnectionConfig } from './config/typeorm.config';
import { ConfigModule } from '@nestjs/config';

const envModule = ConfigModule.forRoot({
  isGlobal: true,
  envFilePath: './.env',
});
const port: number = parseInt(<string>process.env.PORT) || 3306;

@Module({
  imports: [
    envModule,
    TypeOrmModule.forRoot(typeormConnectionConfig),
    CoffeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
