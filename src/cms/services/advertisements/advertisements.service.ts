import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Advertisement } from 'src/typeorm/Advertisement';
import { Repository } from 'typeorm';

@Injectable()
export class AdvertisementsService {
  constructor(
    @InjectRepository(Advertisement)
    private readonly advertisementRespository: Repository<Advertisement>,
  ) {}

  findAll(page: number, size: number) {
    return this.advertisementRespository.findAndCount({
      skip: size * (page - 1),
      take: size,
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
