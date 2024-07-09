import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class StatisticResDto {
  @IsNumber()
  @Type(() => String)
  views: number;

  @IsString()
  @Type(() => String)
  mid_price_by_region: number;

  @IsString()
  @Type(() => String)
  mid_price_by_Ukraine: number;

  @IsString()
  @Type(() => String)
  car_id: number;


}
