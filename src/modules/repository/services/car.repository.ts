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

    qb.orderBy('car.price', 'DESC');
    qb.take(query.limit);
    qb.skip(query.offset);

    return await qb.getManyAndCount();
  }

  public async findCarById(
    userData: IUserData,
    carId: string,
  ): Promise<CarEntity> {
    const qb = this.createQueryBuilder('car');
    qb.leftJoinAndSelect('car.statistic', 'statistic');
    qb.leftJoinAndSelect('car.user', 'user');
    qb.leftJoinAndSelect('user.cars', 'car', 'car.user_id = :myId');

    qb.where('car.id = :carId');
    qb.setParameter('carId', carId);
    qb.setParameter('myId', userData.userId);

    return await qb.getOne();
  }
}
