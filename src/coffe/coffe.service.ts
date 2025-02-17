import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Coffe } from 'src/typeorm/entities/coffe.entity';
import { Repository } from 'typeorm';
import { CreateCoffeDto } from './dto/CreateCoffe.dto';
import { UpdateCoffeDto } from './dto/UpdateCoffe.dto';
import { Flavor } from 'src/typeorm/entities/flavor.entity';

@Injectable()
export class CoffeService {
    constructor(
        @InjectRepository(Coffe)
        private readonly coffeRepository: Repository<Coffe>,

        @InjectRepository(Flavor)
        private readonly flavorRepository: Repository<Flavor>
    ) { }

    public async findAll(): Promise<Coffe[]> {
        return this.coffeRepository.find({
            relations: {
                flavors: true,
            }
        });
    }
    public async findOne(id: number): Promise<Coffe> {
        const coffe = await this.coffeRepository.findOne({
            where: { id: id },
            relations: {
                flavors: true
            }
        });
        if (!coffe) {
            throw new Error(`Coffe with id ${id} not found`);
        }
        return coffe;
    }
    public async create(coffeDto: CreateCoffeDto): Promise<Coffe> {
        try {
            const flavors = await Promise.all(
                coffeDto.flavors.map(({ name }) => this.preloadFlavorByName(name))
            );
            
            coffeDto.created_at = new Date();
            coffeDto.updated_at = new Date();
            coffeDto.isAvailble = true;

            const coffeEntity = this.coffeRepository.create({ ...coffeDto, flavors });
            return this.coffeRepository.save(coffeEntity);
        } catch (error) {
            console.error('Create a new Coffe failure', error.message ?? error);
            throw new HttpException(
                `failed create coffe with name: ${coffeDto.name}.`,
                HttpStatus.BAD_REQUEST,
            );
        }
    }
    public async update(id: number, coffeDto: UpdateCoffeDto): Promise<Coffe> {
        try {
            const coffe = await this.coffeRepository.findOne({
                where: { id: id },
                relations: {
                    flavors: true
                }
            });

            if (!coffe) {
                throw new NotFoundException(`Coffe with id ${id} not found`);
            }
            coffeDto.updated_at = new Date();
            const updatedCoffe = await this.coffeRepository.save(coffeDto);
            return updatedCoffe;

        } catch (error) {
            console.error('Update a Coffe failure', error.message ?? error);
            throw new HttpException(
                `Failed to update coffee with id: ${id}.`,
                HttpStatus.BAD_REQUEST,
            );
        }
    }

    public async remove(id: number): Promise<Coffe> {
        const coffeDeleted = await this.coffeRepository.findOneBy({ id: id });
        if (!coffeDeleted) {
            throw new Error(`Coffe with id ${id} not found`);
        }

        await this.coffeRepository.delete(id);
        return coffeDeleted;
    }
    private async preloadFlavorByName(name: string): Promise<Flavor> {
        const existingFlavor = await this.flavorRepository.findOne({
            where: { name }
        });
        if (!existingFlavor) {
            return this.flavorRepository.create({ name })
        }
        return existingFlavor;
    }
}
