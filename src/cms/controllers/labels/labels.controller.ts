import { Controller, Get, Post, Delete, Put } from '@nestjs/common';
import { LabelsService } from 'src/cms/services/labels/labels.service';

@Controller('/api/cms/label')
export class LabelsController {
  constructor(private readonly labelsService: LabelsService) {}

  @Get()
  findAll() {
    this.labelsService.findAll();
  }

  @Post()
  create() {
    this.labelsService.create();
  }

  @Delete()
  delete() {
    this.labelsService.delete();
  }
}
