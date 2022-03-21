import {
  Body,
  Controller,
  Post,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { CreateItemDto } from 'src/shared/types/item-create.dto';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { IpfsService } from 'src/ipfs/ipfs.service';

@Controller('items')
export class ItemsController {
  constructor(private readonly ipfsService: IpfsService) {}

  @Post()
  @UseInterceptors(AnyFilesInterceptor())
  async createItem(
    @Body() body: CreateItemDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    const images = await this.ipfsService.uploadFile(files);
    const imagesURLs = images;
  }
}
