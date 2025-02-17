import { Entity, Column, PrimaryGeneratedColumn, JoinTable, ManyToMany } from 'typeorm';
import { Flavor } from './flavor.entity';

@Entity()
export class Coffe {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column()
  description: string;

  @Column({type: 'timestamp'})
  created_at : Date;

  @Column({type: 'timestamp'})
  updated_at : Date;

  @Column({default: true})
  isAvaile : boolean;

  @JoinTable()
  @ManyToMany(
    type => Flavor, 
    (flavor) => flavor.coffes,
    {
      cascade: true
    }
  )
  flavors: Flavor[];
}
