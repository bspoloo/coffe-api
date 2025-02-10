import { Flavor } from "src/typeorm/entities/flavor.entity";

export class CreateCoffeDto {
  name: string;
  description: string;
  flavors : Flavor[]
}
