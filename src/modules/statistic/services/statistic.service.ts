import { Injectable } from '@nestjs/common';

import { StatisticRepository } from '../../repository/services/statistic.repository';
import { StatisticResDto } from '../dto/res/statistic.res.dto';
import { StatisticMapper } from './statistic.mapper';

@Injectable()
export class StatisticService {
  constructor(private readonly statisticRepository: StatisticRepository) {}

  public async getStatistic(): Promise<StatisticResDto> {
    const entity = await this.statisticRepository.getStatistic();
    return StatisticMapper.toResponseDTO(entity);
  }
}
