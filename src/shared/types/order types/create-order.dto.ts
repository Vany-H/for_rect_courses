import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEnum, IsString } from 'class-validator';
import { PaymentTypeEnum } from '../payment-type.enum';
import { ServiceEnum } from '../service.enum';
import { ItemOrder } from './item-order.dto';

export class CreateOrderDto {
  @IsArray()
  @ApiProperty({ type: ItemOrder, isArray: true })
  itemsIds: ItemOrder[];

  @IsString()
  @ApiProperty()
  city: string;

  @IsString()
  @IsString()
  @ApiProperty()
  street: string;

  @IsString()
  @ApiProperty()
  house: string;

  @IsString()
  @ApiProperty()
  flat: string;

  @IsString()
  @IsEnum(PaymentTypeEnum)
  @ApiProperty({ enum: PaymentTypeEnum })
  paymentType: PaymentTypeEnum;

  @IsString()
  @IsEnum(ServiceEnum)
  @ApiProperty({ enum: ServiceEnum })
  service: ServiceEnum;
}
