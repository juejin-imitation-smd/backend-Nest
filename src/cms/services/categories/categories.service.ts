import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCateGoryDto } from 'src/cms/dto/categories/create-category.dto';
import { UpdateCateGoryDto } from 'src/cms/dto/categories/update-category.dto';
import { Category } from 'src/typeorm/Category';
import { Label } from 'src/typeorm/Label';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
    @InjectRepository(Label)
    private readonly labelsRespository: Repository<Label>,
  ) {}

  findAll(page: number, size: number) {
    return this.categoriesRepository.findAndCount({
      skip: size * (page - 1),
      take: size,
      relations: ['labels'],
    });
  }

  async create(createCategoryDto: CreateCateGoryDto) {
    const category = this.categoriesRepository.create(createCategoryDto);
    const newLabels = await Promise.all(
      createCategoryDto.labels.map((item) => this.preloadLabels(item.label)),
    );
    return this.categoriesRepository.save({
      ...category,
      labels: newLabels,
    });
  }

  private async preloadLabels(label: string): Promise<Label> {
    const existingLabel = await this.labelsRespository.findOne({
      where: { label },
    });
    if (existingLabel) return new Promise((resolve) => resolve(existingLabel));
    else {
      const newLabel = this.labelsRespository.create({ label });
      console.log(newLabel);
      return this.labelsRespository.save(newLabel);
    }
  }

  async delete(id: number) {
    const category = await this.categoriesRepository.findOne({
      where: { id },
      relations: ['labels'],
    });
    if (!category) return null;
    else if (category.labels && category.labels.length !== 0) {
      await Promise.all(
        category.labels.map((item) => this.labelsRespository.delete(item.id)),
      );
    } else {
      return this.categoriesRepository.delete(id);
    }
  }

  async update(updateCategoryDto: UpdateCateGoryDto) {
    const category = await this.categoriesRepository.preload(updateCategoryDto);
    if (!category) return null;
    const newLabels = await Promise.all(
      updateCategoryDto.labels.map((item) => this.preloadLabels(item.label)),
    );
    return this.categoriesRepository.save({
      ...category,
      labels: newLabels,
    });
  }
}
