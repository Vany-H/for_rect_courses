import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brands } from 'src/entity/brands.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BrandsService {
  @InjectRepository(Brands)
  private readonly brandRepo: Repository<Brands>;

  async createBrand(name: string): Promise<Brands> {
    const brand = await this.brandRepo.findOne({ where: { name } });

    if (!!brand) throw new HttpException('This brand exist', 400);

    return this.brandRepo.save({
      name,
      created_at: new Date(),
      updated_at: new Date(),
    });
  }

  getBrands(
    search: string | undefined = undefined,
  ): Promise<Brands | Brands[]> {
    if (!!search)
      return this.brandRepo
        .createQueryBuilder('b')
        .where(`b.name ilike :search`, { search: `%${search}%` })
        .getMany();

    return this.brandRepo.find();
  }

  async getBrandById(id: number) {
    return this.brandRepo.findOne({ where: { id } });
  }
}
