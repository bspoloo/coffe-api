import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { CoffeService } from './coffe.service';
import { Coffe } from 'src/typeorm/entities/coffe.entity';
import { UpdateCoffeDto } from './dto/UpdateCoffe.dto';
import { CreateCoffeDto } from './dto/CreateCoffe.dto';
import { response } from 'express';

@Controller('coffes')
export class CoffeController {
    constructor(
        private readonly coffeService : CoffeService
    ){}

    @Get()
    public findAll(@Res() response) : Promise<void | Coffe[] >{
        return this.coffeService.findAll().then(
            coffes => {
                response.status(HttpStatus.OK).json(coffes)
            }
        ).catch(() => {
            response.status(HttpStatus.FORBIDDEN).json({messaje : 'not found coffes in database'});
        });
    }

    @Get(':id')
    public findOne(@Param('id') id : number, @Res() response) : Promise<void | Coffe >{
        return this.coffeService.findOne(id).then(
            coffe => {
                response.status(HttpStatus.OK).json(coffe)
            }
        ).catch(() => {
            response.status(HttpStatus.FORBIDDEN).json({messaje : `not found coffe whit id => ${id}`});
        });
    }
    @Post()
    public create(@Body() coffeDto : CreateCoffeDto, @Res() response): Promise <Coffe | void>{
        // return this.coffeService.create(coffeDto);

        return this.coffeService.create(coffeDto).then(
            coffe => {
                response.status(HttpStatus.OK).json(coffe)
            }
        ).catch((error) => {
            response.status(HttpStatus.FORBIDDEN).json({messaje : `Failed to create coffe => ${coffeDto.name} ${error}`});
        });
    }
    @Put(':id')
    public upadte(@Param('id') id: number, @Body() coffeDto : UpdateCoffeDto, @Res() response) : Promise<Coffe | void>{
        // return this.coffeService.update(id, coffeDto);
        return this.coffeService.update(id, coffeDto).then(
            coffe => {
                response.status(HttpStatus.OK).json(coffe)
            }
        ).catch(() => {
            response.status(HttpStatus.FORBIDDEN).json({messaje : `Failed to update coffe with id => ${id}`});
        });
    }

    @Delete(':id')
    public remove(@Param('id') id: number): Promise<Coffe | void>{
        // return this.coffeService.remove(id);

        return this.coffeService.remove(id).then(
            coffe => {
                response.status(HttpStatus.OK).json(coffe)
            }
        ).catch(() => {
            response.status(HttpStatus.FORBIDDEN).json({messaje : `Failed to delete coffe with id => ${id}`});
        });
    }
}
