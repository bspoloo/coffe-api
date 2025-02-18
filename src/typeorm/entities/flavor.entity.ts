import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Coffe } from "./coffe.entity";


@Entity()
export class Flavor{
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @ManyToMany(type => Coffe, coffe => coffe.flavors)
  coffes: Coffe[];
}