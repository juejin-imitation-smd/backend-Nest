import {
  Controller,
  HttpStatus,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PhotoService } from 'src/photo/services/photo/photo.service';

@Controller('api')
export class PhotoController {
  constructor(private readonly photosService: PhotoService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file: Express.Multer.File) {
    const res = await this.photosService.saveFile(file);

    return {
      code: res ? HttpStatus.OK : HttpStatus.BAD_REQUEST,
      msg: res ? 'ok' : 'error',
      data: res ? { path: res } : null,
    };
  }
}
