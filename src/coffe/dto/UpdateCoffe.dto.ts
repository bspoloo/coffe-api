import { PartialType } from '@nestjs/swagger';
import { CreateCoffeDto } from './CreateCoffe.dto';
import { Flavor } from 'src/typeorm/entities/flavor.entity';

export class UpdateCoffeDto extends PartialType(CreateCoffeDto) {
  name?: string;
  description?: string;
  flavors?: Flavor[];
}
