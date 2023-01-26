import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindAllAdvertisementDto } from 'src/cms/dto/advertisements/find-advertisement.dto';
import { Advertisement } from 'src/typeorm/Advertisement';
import { Like, Repository } from 'typeorm';

@Injectable()
export class AdvertisementsService {
  constructor(
    @InjectRepository(Advertisement)
    private readonly advertisementRespository: Repository<Advertisement>,
  ) {}

  findAll(findAllAdvertisementDto: FindAllAdvertisementDto) {
    const { page, size, title } = findAllAdvertisementDto;
    return this.advertisementRespository.findAndCount({
      skip: size * (page - 1),
      take: size,
      where: { title: Like(`%${title}%`) },
    });
  }

  findOne(id: number) {
    const ad = this.advertisementRespository.findOne({ where: { id } });
    return ad;
  }

  create(advertisement: Omit<Advertisement, 'id'>) {
    const newAd = this.advertisementRespository.create(advertisement);
    return this.advertisementRespository.save(newAd);
  }

  async update(ad: Advertisement) {
    const newAd = await this.advertisementRespository.preload(ad);
    if (newAd) return this.advertisementRespository.save(newAd);
    else return null;
  }

  async delete(id: number) {
    const ad = await this.advertisementRespository.findOne({ where: { id } });
    if (ad) return this.advertisementRespository.remove(ad);
    else return null;
  }
}
