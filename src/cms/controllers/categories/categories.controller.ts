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
import { PaginationQuery } from 'src/cms/common/dto/pagination-query.dto';
import { CreateCateGoryDto } from 'src/cms/dto/categories/create-category.dto';
import { UpdateCateGoryDto } from 'src/cms/dto/categories/update-category.dto';
import { CategoriesService } from 'src/cms/services/categories/categories.service';

@Controller('api/cms/column')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  async findAll(@Query() paginationQuery: PaginationQuery) {
    const { page, size } = paginationQuery;
    const [list, total] = await this.categoriesService.findAll(page, size);
    return {
      code: HttpStatus.OK,
      msg: 'ok',
      data: { list, total },
    };
  }

  @Post()
  async create(@Body() createCategoryDto: CreateCateGoryDto) {
    const { id } = await this.categoriesService.create(createCategoryDto);
    return {
      code: HttpStatus.OK,
      msg: 'ok',
      data: { id },
    };
  }

  @Delete()
  async delete(@Query() idQuery: { id: number }) {
    const { id } = idQuery;
    const res = await this.categoriesService.delete(id);
    return {
      code: res ? HttpStatus.OK : HttpStatus.BAD_REQUEST,
      msg: res ? 'ok' : 'invalid id',
      data: null,
    };
  }

  @Put()
  async update(@Body() updateCategoryDto: UpdateCateGoryDto) {
    const category = await this.categoriesService.update(updateCategoryDto);
    return {
      code: category ? HttpStatus.OK : HttpStatus.BAD_REQUEST,
      msg: category ? 'ok' : 'invalid id',
      data: null,
    };
  }
}
