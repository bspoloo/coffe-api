import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CoffeService } from './coffe.service';
import { Coffe } from 'src/typeorm/entities/coffe.entity';
import { UpdateCoffeDto } from './dto/UpdateCoffe.dto';
import { CreateCoffeDto } from './dto/CreateCoffe.dto';

@Controller('coffes')
export class CoffeController {
    constructor(
        private readonly coffeService : CoffeService
    ){}

    @Get()
    public findAll() : Promise<Coffe[]>{
        return this.coffeService.findAll();
    }

    @Get(':id')
    public findOne(@Param('id') id : number) : Promise<Coffe>{
        return this.coffeService.findOne(id);
    }
    @Post()
    public create(@Body() coffeDto : CreateCoffeDto): Promise <Coffe>{
        return this.coffeService.create(coffeDto);
    }
    @Put(':id')
    public upadte(@Param('id') id: number, @Body() coffeDto : UpdateCoffeDto) : Promise<Coffe>{
        return this.coffeService.update(id, coffeDto);
    }

    @Delete(':id')
    public remove(@Param('id') id: number): Promise<Coffe>{
        return this.coffeService.remove(id);
    }
}
