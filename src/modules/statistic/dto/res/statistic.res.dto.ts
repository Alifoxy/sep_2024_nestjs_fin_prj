import { Transform, Type } from 'class-transformer';
import {IsNumber, IsString, Length, Max, Min} from 'class-validator';

import { TransformHelper } from '../../../../common/helpers/transform.helper';
import { Column } from 'typeorm';

export class BaseCarReqDto {
  @IsNumber()
  @Type(() => String)
  views: number;

  @IsString()
  @Type(() => String)
  mid_price_by_region: number;

  @IsString()
  @Type(() => String)
  mid_price_by_Ukraine: number;

  statistic: StatisticResDto;
}
