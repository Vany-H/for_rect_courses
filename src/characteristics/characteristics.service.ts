import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Characteristics } from 'src/entity/characteristics.entity';
import { TypesEnum } from 'src/shared/types/type.enum';
import { Repository } from 'typeorm';

@Injectable()
export class CharacteristicsService {
  @InjectRepository(Characteristics)
  private readonly characteristicsRepo: Repository<Characteristics>;

  async createCharactristic(code: string, type: TypesEnum) {
    const itemOfCode = await this.characteristicsRepo.findOne({
      where: { code },
    });

    if (itemOfCode) throw new HttpException('This Characteristic exist', 400);

    return this.characteristicsRepo.save({ code, type });
  }

  async getAllCharacteristics(search: string | undefined = undefined) {
    if (!!search)
      return this.characteristicsRepo
        .createQueryBuilder('c')
        .where('c.code ilike :search', { search: `%${search}%` });
    return this.characteristicsRepo.find();
  }
}
