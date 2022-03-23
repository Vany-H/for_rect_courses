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

  async getBrendsOfCatagory(category_id: number) {
    const itemsBrands = await this.itemsRepo
      .createQueryBuilder('i')
      .leftJoinAndSelect('i.brands', 'b')
      .where(`i.categories_id = :category`)
      .getMany();

    return itemsBrands.map((el) => el.brands);
  }
}
