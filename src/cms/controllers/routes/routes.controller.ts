import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateRouteDto } from 'src/cms/dto/routes/create-route.dto';
import { UpdateeRouteDto } from 'src/cms/dto/routes/update-route.dto';
import { RoutesService } from 'src/cms/services/routes/routes.service';

@Controller('api/cms/route')
export class RoutesController {
  constructor(private readonly routesServices: RoutesService) {}

  @Get()
  async findAll() {
    const list = await this.routesServices.findAll();
    return {
      code: HttpStatus.OK,
      msg: 'ok',
      data: { list },
    };
  }

  @Post()
  async create(@Body() createRouteDto: CreateRouteDto) {
    const newRoute = await this.routesServices.create(createRouteDto);
    return {
      code: newRoute ? HttpStatus.OK : HttpStatus.BAD_REQUEST,
      msg: newRoute ? 'ok' : 'error',
      data: newRoute
        ? {
            id: newRoute.id,
          }
        : null,
    };
  }

  @Put()
  async update(@Body() updateRouteDto: UpdateeRouteDto) {
    const route = await this.routesServices.update(updateRouteDto);
    return {
      code: route ? HttpStatus.OK : HttpStatus.BAD_REQUEST,
      msg: route ? 'ok' : 'invalid id',
      data: null,
    };
  }

  @Delete()
  async delete(@Query() idQuery: { id: number }) {
    const { id } = idQuery;
    const res = await this.routesServices.delete(id);
    return {
      code: res ? HttpStatus.OK : HttpStatus.BAD_REQUEST,
      msg: res ? 'ok' : 'invalid id',
      data: null,
    };
  }
}
