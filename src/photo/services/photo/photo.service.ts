import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import sharp from 'sharp';

@Injectable()
export class PhotoService {
  async saveFile(file: Express.Multer.File) {
    const filename = `${randomUUID()}.webp`;
    let path: string;

    try {
      await sharp(file.buffer).webp().toFile(`.static/${filename}`);
      path = filename;
    } catch (e) {
      console.log(e);
    }

    return path ? `${process.env.STATIC_PREFIX}/${path}` : null;
  }
}
