import { UserMapper } from '../../user/services/user.mapper';
import { CarListReqDto } from '../dto/req/car-list.req.dto';
import { CarResDto } from '../dto/res/car.res.dto';
import { CarListResDto } from '../dto/res/car-list.res.dto';
import { CarEntity } from '../../../database/entities/car.entity';
import { StatisticMapper } from '../../statistic/services/statistic.mapper';

export class CarMapper {
  public static toResponseDTO(entity: CarEntity): CarResDto {
    return {
      price: 0,
      region: '',
      id: entity.id,
      brand: entity.brand,
      model: entity.model,
      year: entity.year,
      statistic: entity.statistic
        ? StatisticMapper.toResponseDTO(entity.statistic)
        : null,
      user: entity.user ? UserMapper.toResponseDTO(entity.user) : null,
    };
  }
  public static toListResponseDTO(
    entities: CarEntity[],
    total: number,
    query: CarListReqDto,
  ): CarListResDto {
    return {
      data: entities.map(this.toResponseDTO),
      meta: {
        total,
        limit: query.limit,
        offset: query.offset,
      },
    };
  }
}
