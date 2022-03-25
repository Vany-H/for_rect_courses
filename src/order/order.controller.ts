import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Orders } from 'src/entity/order.entity';
import { CreateOrderDto } from 'src/shared/types/order types/create-order.dto';
import { OrderService } from './order.service';

@ApiTags('Orders')
@Controller('order')
export class OrderController {
  constructor(private readonly ordrService: OrderService) {}

  @Post()
  async createOrder(@Body() body: CreateOrderDto): Promise<Orders> {
    return this.ordrService.orderCreate(body);
  }
}
