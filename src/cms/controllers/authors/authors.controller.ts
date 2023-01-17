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
import {
  CreateAuthorDto,
  UpdateAuthorDto,
} from 'src/cms/dto/authors/create-author.dto';
import { AuthorsService } from 'src/cms/services/authors/authors.service';

@Controller('api/cms/author')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Get()
  async findRange(@Query() paginationQuery) {
    const { size, page } = paginationQuery;
    const list = await this.authorsService.findRange(page, size);
    return {
      code: 200,
      msg: 'ok',
      data: { list, total: list.length },
    };
  }

  async findOne(id: number) {
    const author = await this.authorsService.findOne(id);
    return {
      code: author ? HttpStatus.OK : HttpStatus.BAD_REQUEST,
      msg: author ? 'ok' : 'invalid id',
      data: null,
    };
  }

  @Put()
  async update(@Body() updateAuthorDto: UpdateAuthorDto) {
    const author = await this.authorsService.update(updateAuthorDto);
    return {
      code: author !== null ? HttpStatus.OK : HttpStatus.BAD_REQUEST,
      msg: author !== null ? 'ok' : 'invalid id',
      data: author !== null ? { id: author.id } : null,
    };
  }

  @Post()
  async create(@Body() createAuthorDto: CreateAuthorDto) {
    const { id } = await this.authorsService.create(createAuthorDto);
    return {
      code: HttpStatus.OK,
      msg: 'ok',
      data: { id },
    };
  }

  @Delete()
  async delete(@Query() idQuery) {
    const { id } = idQuery;
    const res = await this.authorsService.delete(id);

    return {
      code: res !== null ? HttpStatus.OK : HttpStatus.BAD_REQUEST,
      msg: res !== null ? 'ok' : 'invalid id',
      data: null,
    };
  }
}
