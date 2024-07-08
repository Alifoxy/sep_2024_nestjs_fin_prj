import { Module } from '@nestjs/common';

import { CarController } from './car.controller';
import { CarService } from './services/car.service';

@Module({
  imports: [],
  controllers: [CarController],
  providers: [CarService],
  exports: [CarService],
})
export class CarModule {}
