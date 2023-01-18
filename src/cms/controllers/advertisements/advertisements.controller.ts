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
import { CreateAdvertisementDto } from 'src/cms/dto/advertisements/create-advertisement.dto';
import { UpdateAdvertisementDto } from 'src/cms/dto/advertisements/update-advertisement.dto';
import { AdvertisementsService } from 'src/cms/services/advertisements/advertisements.service';

@Controller('api/cms')
export class AdvertisementsController {
  constructor(private readonly advertisementService: AdvertisementsService) {}

  @Get('getAdvertisements')
  async findRange(@Query() paginationQuery) {
    const { page, size } = paginationQuery;
    const list = await this.advertisementService.findRange(page, size);

    return {
      code: HttpStatus.OK,
      msg: 'ok',
      data: { list, total: list.length },
    };
  }

  @Get('advertisement')
  async findOne(@Query() idQuery) {
    const { id } = idQuery;
    const advertisement = await this.advertisementService.findOne(id);
    return {
      code: advertisement ? HttpStatus.OK : HttpStatus.BAD_REQUEST,
      msg: advertisement ? 'ok' : 'invalid id',
      data: { advertisement },
    };
  }

  @Delete('advertisement')
  async delete(@Query() idQuery) {
    const { id } = idQuery;
    const res = await this.advertisementService.delete(id);
    return {
      code: res ? HttpStatus.OK : HttpStatus.BAD_REQUEST,
      msg: res ? 'ok' : 'invalid id',
      data: null,
    };
  }

  @Post('advertisement')
  async create(@Body() createAdvertisementDto: CreateAdvertisementDto) {
    const { id } = await this.advertisementService.create(
      createAdvertisementDto,
    );
    return {
      code: HttpStatus.OK,
      msg: 'ok',
      data: { id },
    };
  }

  @Put('advertisement')
  async update(@Body() updateAdvertisementDto: UpdateAdvertisementDto) {
    const ad = await this.advertisementService.update(updateAdvertisementDto);
    return {
      code: ad ? HttpStatus.OK : HttpStatus.BAD_REQUEST,
      msg: ad ? 'ok' : 'invalid id',
      data: null,
    };
  }
}
