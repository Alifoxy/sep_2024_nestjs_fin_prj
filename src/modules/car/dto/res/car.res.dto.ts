import { ApiProperty } from '@nestjs/swagger';

import { UserResDto } from '../../../user/dto/res/user.res.dto';
import {StatisticEntity} from "../../../../database/entities/statistic.entity";

export class CarResDto {
  @ApiProperty({
    example: '796cea24-a328-4463-a5e1-85a779e4780f',
    description: 'Car ID',
  })
  id: string;

  @ApiProperty({
    example: 'BMW',
    description: 'Car Brand',
  })
  brand: string;

  @ApiProperty({
    example: 'Car Model',
    description: 'Article Description',
  })
  model: string;

  @ApiProperty({
    example: '1997',
    description: 'Car Year',
  })
  year: string;

  @ApiProperty({
    example: '100000',
    description: 'Price of the Car',
  })
  price: number;

  @ApiProperty({
    example: 'Lviv',
    description: 'Car sell region',
  })
  region: string;

  @ApiProperty({
    example: ['tag1', 'tag2'],
    description: 'Article Tags',
  })
  statistic: StatisticEntity;

  user?: UserResDto;
}
