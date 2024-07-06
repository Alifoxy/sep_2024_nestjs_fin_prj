import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

import { CarEntity } from './car.entity';
import { TableNameEnum } from './enums/table-name.enum';
import { BaseModel } from './models/base.model';

@Entity({ name: TableNameEnum.STATISTICS })
export class StatisticEntity extends BaseModel {
  @Column('text')
  views: number;

  @Column('text')
  mid_price_by_region: string;

  @Column('text')
  mid_price_by_Ukraine: string;

  @Column()
  car_id: string;
  @OneToOne(() => CarEntity, (entity) => entity.statistic)
  @JoinColumn({ name: 'car_id' })
  car?: CarEntity;
}
