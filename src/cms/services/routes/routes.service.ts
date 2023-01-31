import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRouteDto } from 'src/cms/dto/routes/create-route.dto';
import { UpdateeRouteDto } from 'src/cms/dto/routes/update-route.dto';
import { RouterList } from 'src/typeorm/RouterList';
import { Repository } from 'typeorm';

@Injectable()
export class RoutesService {
  constructor(
    @InjectRepository(RouterList)
    private readonly routesRepository: Repository<RouterList>,
  ) {}

  findAll() {
    return this.routesRepository.find();
  }

  create(createRouteDto: CreateRouteDto) {
    const newRoute = this.routesRepository.create(createRouteDto);
    return this.routesRepository.save(newRoute);
  }

  async update(updateRouteDto: UpdateeRouteDto) {
    const route = await this.routesRepository.preload(updateRouteDto);
    if (route) return this.routesRepository.save(route);
    else return null;
  }

  async delete(id: number) {
    const route = await this.routesRepository.findOne({ where: { id } });
    if (route) return this.routesRepository.delete(id);
    else return null;
  }
}
