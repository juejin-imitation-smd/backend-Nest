import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAdvertisementDto } from 'src/cms/dto/advertisements/create-advertisement.dto';
import { FindAllAdvertisementDto } from 'src/cms/dto/advertisements/find-advertisement.dto';
import { UpdateAdvertisementDto } from 'src/cms/dto/advertisements/update-advertisement.dto';
import { Author } from 'src/typeorm/Author';
import { Like, Repository } from 'typeorm';
import { Advertisement } from 'src/typeorm/Advertisement';

@Injectable()
export class AdvertisementsService {
  constructor(
    @InjectRepository(Advertisement)
    private readonly advertisementRespository: Repository<Advertisement>,
    @InjectRepository(Author)
    private readonly authorsRespository: Repository<Author>,
  ) {}

  findAll(findAllAdvertisementDto: FindAllAdvertisementDto) {
    const { page, size, title } = findAllAdvertisementDto;
    return this.advertisementRespository.findAndCount({
      skip: size * (page - 1),
      take: size,
      where: { title: Like(`%${title}%`) },
      relations: ['author'],
    });
  }

  findOne(id: number) {
    const ad = this.advertisementRespository.findOne({
      where: { id },
      relations: ['author'],
    });
    return ad;
  }

  async create(createAdvertisementDto: CreateAdvertisementDto) {
    const { author_id: id } = createAdvertisementDto;
    const existingAuthor = await this.authorsRespository.findOne({
      where: { id },
    });
    if (existingAuthor) {
      const newAd = this.advertisementRespository.create({
        ...createAdvertisementDto,
        author: existingAuthor,
      });
      return this.advertisementRespository.save(newAd);
    } else return null;
  }

  async update(updateAdvertisementDto: UpdateAdvertisementDto) {
    const { author_id: id } = updateAdvertisementDto;
    const existingAuthor = await this.authorsRespository.findOne({
      where: { id },
    });
    if (existingAuthor) {
      const newAd = await this.advertisementRespository.preload({
        ...updateAdvertisementDto,
        author: existingAuthor,
      });
      return this.advertisementRespository.save(newAd);
    } else return null;
  }

  async delete(id: number) {
    const ad = await this.advertisementRespository.findOne({ where: { id } });
    if (ad) return this.advertisementRespository.remove(ad);
    else return null;
  }
}
