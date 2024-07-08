import { Transform, Type } from 'class-transformer';
import { IsString, Length, Max, Min} from 'class-validator';

import { TransformHelper } from '../../../../common/helpers/transform.helper';
import { StatisticResDto } from "../../../statistic/dto/res/statistic.res.dto";

export class BaseCarReqDto {
  @IsString()
  @Length(3, 50)
  @Transform(TransformHelper.trim)
  @Type(() => String)
  brand: string;

  @IsString()
  @Length(0, 300)
  @Transform(TransformHelper.trim)
  @Type(() => String)
  model: string;

  @IsString()
  @Min(1950)
  @Max(2023)
  @Transform(TransformHelper.trim)
  @Type(() => String)
  year: string;

  @IsString()
  @Transform(TransformHelper.trim)
  @Type(() => String)
  price: number;

  @IsString()
  @Length(0, 3000)
  image?: string;

  @IsString()
  @Length(0, 3000)
  @Transform(TransformHelper.trim)
  @Type(() => String)
  region: string;

  statistic: StatisticResDto;
}
