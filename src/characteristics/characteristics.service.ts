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

    return this.characteristicsRepo.save({
      code,
      type,
      created_at: new Date(),
      updated_at: new Date(),
    });
  }

  async getAllCharacteristics(search: string | undefined = undefined) {
    if (!!search)
      return this.characteristicsRepo
        .createQueryBuilder('c')
        .where('c.code ilike :search', { search: `%${search}%` })
        .getMany();
    return this.characteristicsRepo.find();
  }

  async checkCharacteristic(obj: any) {
    if (typeof obj !== 'object')
      throw new HttpException('Characteristics must be JSON string', 400);

    const keys = Object.entries(obj).map(([key]) => key);
    const characteristic = await this.characteristicsRepo
      .createQueryBuilder('c')
      .where(`c.code IN (:...keys)`, { keys })
      .getMany();

    return characteristic.reduce((accum, el) => {
      if (typeof obj[el.code] === el.type)
        return (accum[el.code] = { id: el.id, value: obj[el.code] });
      return accum;
    }, {});
  }
}
