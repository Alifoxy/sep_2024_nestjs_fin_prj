import { Global, Module } from '@nestjs/common';

import { CarRepository } from './services/car.repository';
import { StatisticRepository } from './services/statistic.repository';
import { RefreshTokenRepository } from './services/refresh-token.repository';
import { UserRepository } from './services/user.repository';

const repositories = [
  CarRepository,
  UserRepository,
  StatisticRepository,
  RefreshTokenRepository,
];

@Global()
@Module({
  providers: [...repositories],
  exports: [...repositories],
})
export class RepositoryModule {}
