import {
  Body,
  Controller,
  Post,
  UseInterceptors,
  UploadedFiles,
  Get,
  Param,
  Query,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { CharacteristicsService } from 'src/characteristics/characteristics.service';
import { IpfsService } from 'src/ipfs/ipfs.service';
import { CreateItemDto } from 'src/shared/types/items types/item-create.dto';
import {
  GetItemsParamDto,
  GetItemsQueryDto,
} from 'src/shared/types/items types/item-get.dto';
import { ItemsService } from './items.service';

@Controller('items')
export class ItemsController {
  constructor(
    private readonly ipfsService: IpfsService,
    private readonly itemService: ItemsService,
    private readonly characteristicService: CharacteristicsService,
  ) {}

  @Post()
  @UseInterceptors(AnyFilesInterceptor())
  async createItem(
    @Body()
    {
      name,
      grade,
      characteristics,
      parent,
      sale,
      price,
      brandId,
      categoriesId,
    }: CreateItemDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    const images = await this.ipfsService.uploadFile(files);
    const imageURLs = await Promise.all(
      images.map(async (el) => await this.ipfsService.downloadFileUrl(el.Name)),
    );

    const obj = JSON.parse(characteristics);
    const characters = await this.characteristicService.checkCharacteristic(
      obj,
    );

    this.itemService.createItem({
      name,
      grade,
      parent,
      sale,
      price,
      imageURLs,
      titleImg: imageURLs[0],
      brandId,
      categoriesId,
    });
  }

  @Get('items/:categories/:brands')
  async itemsList(
    @Param() { categories, brands }: GetItemsParamDto,
    @Query() query: GetItemsQueryDto,
  ) {
    return this.itemService.getItems(categories, brands, query);
  }
}
