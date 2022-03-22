import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Items } from 'src/entity/items.entity';
import { CreateItemDto } from 'src/shared/types/items types/item-create.dto';
import { Repository } from 'typeorm';

@Injectable()
export class ItemsService {
  @InjectRepository(Items)
  private readonly itemRepository: Repository<Items>;

  async createItem({
    name,
    grade,
    price,
    sale,
    parent,
    titleImg,
    imagesURLs,
    characteristics,
  }: CreateItemDto): Promise<Items> {
    const item = await this.itemRepository.save({
      name,
      grade,
      price,
      sale,
      parent,
      titleImg,
      imagesURLs,
    });

    return item;
  }

  // async createItem(data: CreateItemDto): Promise<Items> {
  //   const items = await this.itemRepository.save(data);

  //   return items;
  // }

  async getItems() {}
}
