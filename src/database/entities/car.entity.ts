import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

import { TableNameEnum } from './enums/table-name.enum';
import { BaseModel } from './models/base.model';
import { UserEntity } from './user.entity';
import { StatisticEntity } from './statistic.entity';

@Entity({ name: TableNameEnum.CARS })
export class CarEntity extends BaseModel {
  @Column('text')
  brand: string;

  @Column('text')
  model: string;

  @Column('text')
  year: string;

  @Column('text')
  price: number;

  @Column('text')
  region: string;

  @OneToOne(() => StatisticEntity, (entity) => entity.car)
  statistic?: StatisticEntity;

  @Column()
  user_id: string;
  @ManyToOne(() => UserEntity, (entity) => entity.cars)
  @JoinColumn({ name: 'user_id' })
  user?: UserEntity;
}
