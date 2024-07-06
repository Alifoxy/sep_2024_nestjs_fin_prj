import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { StatisticEntity } from '../../../database/entities/statistic.entity';

@Injectable()
export class StatisticRepository extends Repository<StatisticEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(StatisticEntity, dataSource.manager);
  }

  public async getStatistic(): Promise<StatisticEntity> {
    const qb = this.createQueryBuilder('statistic');
    qb.leftJoin('statistic.car', 'car');

    return await qb.getOne();
  }
}
