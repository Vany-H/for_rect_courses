import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BrandsService } from 'src/brands/brands.service';
import { CategoriesService } from 'src/categories/categories.service';
import { CommentService } from 'src/comment/comment.service';
import { CharacteristicsItems } from 'src/entity/characteristics_items.entity';
import { Items } from 'src/entity/items.entity';
import { CreateItemDto } from 'src/shared/types/items types/item-create.dto';
import { GetItemsQueryDto } from 'src/shared/types/items types/item-get.dto';
import { ItemPageEnum } from 'src/shared/types/items types/item-page.enum';
import { Repository } from 'typeorm';

@Injectable()
export class ItemsService {
  @InjectRepository(Items)
  private readonly itemRepository: Repository<Items>;
  @InjectRepository(CharacteristicsItems)
  private readonly characteristicsItemsRepository: Repository<CharacteristicsItems>;

  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly brandService: BrandsService,
    private readonly commentService: CommentService,
  ) {}

  async createItem({
    name,
    grade,
    price,
    sale,
    parentId,
    titleImg,
    imageURLs,
    brandId,
    categoriesId,
  }: CreateItemDto): Promise<Items> {
    const item = await this.itemRepository.save({
      name,
      grade,
      price,
      sale,
      parentId,
      titleImg,
      imageURLs,
      brandsId: brandId,
      categoriesId,
      created_at: new Date(),
      updated_at: new Date(),
    });

    return this.itemRepository.findOne({
      where: { name: item.name },
      order: { created_at: 'DESC' },
    });
  }

  async getItems(
    categories: string | undefined,
    brand: string | undefined,
    { sortBy, sortType, search, offset, limit }: GetItemsQueryDto,
  ) {
    const { id: categoriesId } = await this.categoriesService.getCategoryByName(
      categories,
      false,
    );
    const { id: brandId } = await this.brandService.getBrandByName(
      brand,
      false,
    );

    const itemsQuery = this.itemRepository
      .createQueryBuilder('i')
      .leftJoinAndSelect('i.categories', 'c')
      .leftJoinAndSelect('i.brands', 'b')
      .skip(offset)
      .take(limit);

    if (!!categoriesId || categoriesId === 0)
      itemsQuery.andWhere(`i.categories_id   = :categoriesId`, {
        categoriesId,
      });

    if (!!brandId || brandId === 0)
      itemsQuery.andWhere(`i.brands_id = :brandId`, { brandId });

    if (!!search)
      itemsQuery.andWhere(`i.name ilike :search`, { search: `%${search}%` });

    if (!!sortBy && !!sortType) itemsQuery.orderBy(`i.${sortBy}`, sortType);

    const [items, count] = await itemsQuery.getManyAndCount();

    return { items, count };
  }

  async addCharacteristics(
    characteristics: any,
    item_id: number,
  ): Promise<CharacteristicsItems[]> {
    const item = await this.itemRepository.findOne({ where: { id: item_id } });

    if (!item)
      throw new HttpException(`Item with Id ${item_id} not exist`, 404);

    const characteriscticsItem = Object.entries(characteristics).map(
      ([, el]) => {
        const elem = el as any;
        return {
          characteristics_id: elem.id,
          items_id: item_id,
          value: elem.value,
        };
      },
    );

    return this.characteristicsItemsRepository.save(characteriscticsItem);
  }

  async itemInfo(
    id: number,
    page: ItemPageEnum = ItemPageEnum.Main,
    offset: number,
    limit: number,
  ) {
    const item = await this.itemRepository.findOne({ where: { id } });

    if (!item) throw new HttpException(`Item with Id ${id} not exist`, 404);

    const itemsVariable = await this.characteristicsItemsRepository
      .createQueryBuilder('chi')
      .leftJoinAndSelect('chi.characteristics', 'ch')
      .leftJoinAndSelect('chi.item', 'it  ')
      .where(
        `chi.items_id IN (SELECT id FROM items as i WHERE i.id = :id OR i.id = :parentId OR i.parent_id = :id OR i.parent_id = :parentId)`,
        { parentId: item.parentId, id },
      )
      .getMany();

    const characteristicItem = itemsVariable.reduce((accum, char) => {
      if (!accum[`${char.item.id}`]) accum[`${char.item.id}`] = {};
      accum[`${char.item.id}`][char.characteristics.code] = char.value;
      return accum;
    }, {});

    const variableCaharcteristics = Object.entries(
      characteristicItem[`${item.id}`],
    ).map(([key]) => key);

    const variebleItem = {};

    if (page === ItemPageEnum.Characteristic) {
      const objectRes =
        characteristicItem[`${!!item.parentId ? item.parentId : item.id}`];

      for (const el of variableCaharcteristics) {
        objectRes[el] = characteristicItem[`${item.id}`][el];
      }

      return { ...item, characterisctics: objectRes };
    }

    if (page === ItemPageEnum.Comment) {
      if (!limit || !offset)
        throw new HttpException(
          'Must be specified limit and offcet parameters',
          400,
        );
      return this.commentService.searchComment({ itemId: id, limit, offset });
    }

    Object.entries(characteristicItem).forEach(([key, value]) => {
      for (const el of variableCaharcteristics) {
        if (!variebleItem[el]) {
          variebleItem[el] = {};
          variebleItem[el][
            characteristicItem[`${item.id}`][el]
          ] = `/items/${item.id}/main`;
        }

        if (value[el] !== characteristicItem[`${item.id}`][el] && !!value[el]) {
          if (!variebleItem[el]) variebleItem[el] = {};
          variebleItem[el][value[el]] = `/items/${key}/main`;
          break;
        }
      }
    });

    return { ...item, variebleItem };
  }
}
