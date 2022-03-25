import {
  Body,
  Controller,
  Post,
  UseInterceptors,
  UploadedFiles,
  Get,
  Param,
  Query,
  Req,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { ApiExcludeEndpoint, ApiHideProperty, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { CharacteristicsService } from 'src/characteristics/characteristics.service';
import { IpfsService } from 'src/ipfs/ipfs.service';
import { CreateItemDto } from 'src/shared/types/items types/item-create.dto';
import {
  GetItemsParamDto,
  GetItemsQueryDto,
} from 'src/shared/types/items types/item-get.dto';
import { GetItemInfoParamDto } from 'src/shared/types/items types/item-info.dto';
import { ItemsService } from './items.service';

@ApiTags('Items')
@Controller('items')
export class ItemsController {
  constructor(
    private readonly ipfsService: IpfsService,
    private readonly itemService: ItemsService,
    private readonly characteristicService: CharacteristicsService,
  ) {}

  @ApiExcludeEndpoint(true)
  @Post()
  @UseInterceptors(AnyFilesInterceptor())
  async createItem(
    @Body()
    {
      name,
      grade,
      characteristics,
      parentId,
      sale,
      price,
      brandId,
      categoriesId,
    }: CreateItemDto,
    @UploadedFiles() files: Express.Multer.File[],
    @Req() request: Request,
  ) {
    const images = await this.ipfsService.uploadFile(files);
    const imageURLs = await Promise.all(
      images.map(
        async (el) =>
          await this.ipfsService.downloadFileUrl(el.Name, request.hostname),
      ),
    );

    const obj = JSON.parse(characteristics);
    const characters = await this.characteristicService.checkCharacteristic(
      obj,
    );

    const { id } = await this.itemService.createItem({
      name,
      grade,
      parentId,
      sale,
      price,
      imageURLs,
      titleImg: imageURLs[0],
      brandId,
      categoriesId,
    });

    this.itemService.addCharacteristics(characters, id);
  }

  @Get('items/:categories/:brands')
  async itemsList(
    @Param() { categories }: GetItemsParamDto,
    @Query() query: GetItemsQueryDto,
  ) {
    return this.itemService.getItems(categories, query.brands, query);
  }

  @Get('/:item_id/:page')
  async itemInfo(@Param() { item_id, page }: GetItemInfoParamDto) {
    return this.itemService.itemInfo(item_id, page);
  }
}
