import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Items } from 'src/entity/items.entity';
import { OrdersItems } from 'src/entity/order-items.entity';
import { Orders } from 'src/entity/order.entity';
import { CreateOrderDto } from 'src/shared/types/order types/create-order.dto';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService {
  @InjectRepository(Orders)
  private readonly orderRepo: Repository<Orders>;
  @InjectRepository(Orders)
  private readonly orderItemsRepo: Repository<OrdersItems>;
  @InjectRepository(Items)
  private readonly itemsRepo: Repository<Items>;

  async orderCreate({
    itemsIds,
    city,
    flat,
    house,
    paymentType,
    service,
    street,
  }: CreateOrderDto) {
    const itemsIdArray = await this.itemsRepo
      .createQueryBuilder('o')
      .where(`o.id IN (...:array)`, { array: itemsIds.map((el) => el.itemsId) })
      .getMany();

    if (itemsIdArray.length !== itemsIds.length)
      throw new HttpException('Item not exist', 400);

    const total = itemsIdArray.reduce((accum, el) => accum + el.price, 0);

    await this.orderRepo.save({
      city,
      flat,
      house,
      paymentType,
      service,
      street,
      created_at: new Date(),
      updated_at: new Date(),
    });

    const order = await this.orderRepo.findOne({
      where: { name: city },
      order: { created_at: 'DESC' },
    });

    const saveOrderObjects = itemsIds.map((el) => ({
      ...el,
      ordersId: order.id,
    }));

    return order;
  }
}
