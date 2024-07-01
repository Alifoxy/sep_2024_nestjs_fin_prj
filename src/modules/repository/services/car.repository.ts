import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { CarEntity } from '../../../database/entities/car.entity';
import { CarListReqDto } from '../../car/dto/req/car-list.req.dto';
import { IUserData } from '../../auth/interfaces/user-data.interface';

@Injectable()
export class CarRepository extends Repository<CarEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(CarEntity, dataSource.manager);
  }

  public async getList(
    userData: IUserData,
    query: CarListReqDto,
  ): Promise<[CarEntity[], number]> {
    const qb = this.createQueryBuilder('car');
    qb.leftJoinAndSelect('car.statistic', 'statistic');
    qb.leftJoinAndSelect('car.user', 'user');
    qb.leftJoinAndSelect('user.cars', 'car', 'car.user_id = :myId');
    qb.setParameter('myId', userData.userId);

    if (query.search) {
      qb.andWhere(
        'CONCAT(LOWER(car.brand), LOWER(car.model), LOWER(car.year), LOWER(car.region)) LIKE :search',
      );
      qb.setParameter('search', `%${query.search}%`);
    }

    qb.orderBy('article.created', 'DESC');
    qb.take(query.limit);
    qb.skip(query.offset);

    return await qb.getManyAndCount();
  }

  public async findArticleById(
    userData: IUserData,
    articleId: string,
  ): Promise<ArticleEntity> {
    const qb = this.createQueryBuilder('article');
    qb.leftJoinAndSelect('article.likes', 'like', 'like.user_id = :myId');
    qb.leftJoinAndSelect('article.tags', 'tag');
    qb.leftJoinAndSelect('article.user', 'user');
    qb.leftJoinAndSelect(
      'user.followings',
      'follow',
      'follow.follower_id = :myId',
    );

    qb.where('article.id = :articleId');
    qb.setParameter('articleId', articleId);
    qb.setParameter('myId', userData.userId);

    return await qb.getOne();
  }
}
