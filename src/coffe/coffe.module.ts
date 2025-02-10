import { Module } from '@nestjs/common';
import { CoffeService } from './coffe.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeController } from './coffe.controller';
import { Coffe } from 'src/typeorm/entities/coffe.entity';
import { Flavor } from 'src/typeorm/entities/flavor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Coffe, Flavor])],
  controllers: [CoffeController],
  providers: [CoffeService],
})
export class CoffeModule {}
