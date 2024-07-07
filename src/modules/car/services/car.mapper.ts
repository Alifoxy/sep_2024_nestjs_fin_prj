import { ArticleEntity } from '../../../database/entities/article.entity';
import { UserMapper } from '../../user/services/user.mapper';
import { CarListReqDto } from '../dto/req/car-list.req.dto';
import { CarResDto } from '../dto/res/car.res.dto';
import { CarListResDto } from '../dto/res/article-list.res.dto';
import { CarEntity } from '../../../database/entities/car.entity';

export class CarMapper {
  public static toResponseDTO(entity: CarEntity): CarResDto {
    return {
      id: entity.id,
      brand: entity.brand,
      model: entity.model,
      year: entity.year,
      created: entity.created,
      updated: entity.updated,
      isLiked: entity.likes?.length > 0,
      tags: entity.tags ? entity.tags.map((tag) => tag.name) : [],
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