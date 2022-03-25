import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Categories } from 'src/entity/categories.entity';
import { Items } from 'src/entity/items.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  @InjectRepository(Categories)
  private readonly categoriesRepo: Repository<Categories>;

  @InjectRepository(Items)
  private readonly itemsRepo: Repository<Items>;

  async createCategory(name: string) {
    const categories = await this.categoriesRepo.findOne({ where: { name } });
    if (!!categories) throw new HttpException('This categories exist', 400);
    this.categoriesRepo.save({
      name,
      created_at: new Date(),
      updated_at: new Date(),
    });
  }

  async getCategories(search: string) {
    if (!!search)
      return this.categoriesRepo
        .createQueryBuilder('b')
        .where(`b.name ilike :search`, { search: `%${search}%` })
        .getMany();

    return this.categoriesRepo.find();
  }

  async getCategoryById(id: number) {
    return this.categoriesRepo.findOne({ where: { id } });
  }

  async getCategoryByName(name: string, check: boolean = true) {
    const category = await this.categoriesRepo.findOne({ where: { name } });
    if (!category && check)
      throw new HttpException(`Category "${name}" not exist`, 400);

    if (!category) return { id: undefined };

    return category;
  }

  async getBrandsOfCatagory(category_id: number | string) {
    const itemsQuery = await this.itemsRepo
      .createQueryBuilder('i')
      .leftJoinAndSelect('i.brands', 'b')
      .leftJoinAndSelect('i.categories', 'c');

    if (!!+category_id)
      itemsQuery.where(
        `i.categories_id = :category_id OR c.name = :category_id`,
        {
          category_id,
        },
      );
    else
      itemsQuery.where(`c.name = :category_id`, {
        category_id,
      });

    const itemsBrands = await itemsQuery.getMany();

    return itemsBrands.reduce((accum, el) => {
      let check = false;
      for (const ele of accum) {
        if (ele.name === el.brands.name) {
          check = true;
          break;
        }
      }

      if (!check && !!el.brands)
        accum.push({ name: el.brands.name, id: el.brandsId });
      return accum;
    }, []);
  }
}
