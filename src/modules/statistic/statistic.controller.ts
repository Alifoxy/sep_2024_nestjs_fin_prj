import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { SkipAuth } from '../auth/decorators/skip-auth.decorator';
import { StatisticResDto } from './dto/res/statistic.res.dto';
import { StatisticService } from './services/statistic.service';

@ApiTags('Statistic')
@Controller('statistic')
export class StatisticController {
  constructor(private readonly statisticService: StatisticService) {}

  @SkipAuth()
  @Get('statistic')
  public async getStatistic(): Promise<StatisticResDto> {
    return await this.statisticService.getStatistic();
  }
}
