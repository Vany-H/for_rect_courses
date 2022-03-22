import {
  Body,
  Controller,
  Post,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { IpfsService } from 'src/ipfs/ipfs.service';
import { CreateItemDto } from 'src/shared/types/items types/item-create.dto';
import { ItemsService } from './items.service';

@Controller('items')
export class ItemsController {
  constructor(
    private readonly ipfsService: IpfsService,
    private readonly itemService: ItemsService,
  ) {}

  @Post()
  @UseInterceptors(AnyFilesInterceptor())
  async createItem(
    @Body()
    { name, grade, characteristics, parent, sale, price }: CreateItemDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    const images = await this.ipfsService.uploadFile(files);
    const imagesURLs = await Promise.all(
      images.map(async (el) => await this.ipfsService.downloadFileUrl(el.Name)),
    );

    this.itemService.createItem({
      name,
      grade,
      parent,
      sale,
      price,
      imagesURLs,
      titleImg: imagesURLs[0],
    });
  }
}
