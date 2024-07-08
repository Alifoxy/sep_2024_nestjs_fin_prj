import { StatisticEntity } from '../../../database/entities/statistic.entity';
import { StatisticResDto } from '../dto/res/statistic.res.dto';

export class StatisticMapper {
  public static toResponseDTO(entity: StatisticEntity): StatisticResDto {
    return {
      views: entity.views,
      mid_price_by_region: entity.mid_price_by_region,
      mid_price_by_Ukraine: entity.mid_price_by_region,
    };
  }
}
