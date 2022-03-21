import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Items } from 'src/entity/items.entity';
import { CreateItemDto } from 'src/shared/types/item-create.dto';
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
    title_img,
    image_URL,
    characteristics,
  }: CreateItemDto) {
    const item = await this.itemRepository.save({
      name,
      grade,
      price,
      sale,
      parent,
      title_img,
      image_URL,
    });
  }

  async getItems() {}
}
