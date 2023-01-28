import { Module } from '@nestjs/common';
import { PhotoController } from './controllers/photo/photo.controller';
import { PhotoService } from './services/photo/photo.service';

@Module({
  controllers: [PhotoController],
  providers: [PhotoService],
})
export class PhotoModule {}
