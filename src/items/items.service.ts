import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BrandsService } from 'src/brands/brands.service';
import { CategoriesService } from 'src/categories/categories.service';
import { Items } from 'src/entity/items.entity';
import { CreateItemDto } from 'src/shared/types/items types/item-create.dto';
import { GetItemsQueryDto } from 'src/shared/types/items types/item-get.dto';
import { Repository } from 'typeorm';

@Injectable()
export class ItemsService {
  @InjectRepository(Items)
  private readonly itemRepository: Repository<Items>;

  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly brandService: BrandsService,
  ) {}

  async createItem({
    name,
    grade,
    price,
    sale,
    parent,
    titleImg,
    imageURLs,
  }: CreateItemDto): Promise<Items> {
    const item = await this.itemRepository.save({
      name,
      grade,
      price,
      sale,
      parent,
      titleImg,
      imageURLs,
      created_at: new Date(),
      updated_at: new Date(),
    });

    return item;
  }

  async getItems(
    categories: string | undefined,
    brand: string | undefined,
    { sortBy, sortType, search, offset, limit }: GetItemsQueryDto,
  ) {
    const categoriesId = 0;
    const brandId = 0;

    const itemsQuery = this.itemRepository
      .createQueryBuilder('i')
      .leftJoinAndSelect('i.categories', 'c')
      .leftJoinAndSelect('i.brands', 'b')
      .skip(offset)
      .take(limit);

    if (!!categoriesId)
      itemsQuery.andWhere(`i.categories_id = :categoriesId`, { categoriesId });

    if (!!brandId) itemsQuery.andWhere(`i.brands_id = :brandId`, { brandId });

    if (!!search)
      itemsQuery.andWhere(`i.name ilike :search`, { search: `%${search}%` });

    if (!!sortBy && !!sortType) itemsQuery.orderBy(`i.${sortBy}`, sortType);

    const [items, count] = await itemsQuery.getManyAndCount();

    return { items, count };
  }
}
