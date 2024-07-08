import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { In } from 'typeorm';

import { CarEntity } from '../../../database/entities/car.entity';
import { StatisticEntity } from '../../../database/entities/statistic.entity';
import { IUserData } from '../../auth/interfaces/user-data.interface';
import { LoggerService } from '../../logger/logger.service';
import { CarRepository } from '../../repository/services/car.repository';
import { StatisticRepository } from '../../repository/services/statistic.repository';
import { UserRepository } from '../../repository/services/user.repository';
import { UpdateCarReqDto } from '../dto/req/update-car.req.dto';
import { CarListResDto } from '../dto/res/car-list.res.dto';
import { CarMapper } from './car.mapper';
import { CarListReqDto } from '../dto/req/car-list.req.dto';
import { CarResDto } from '../dto/res/car.res.dto';
import { CreateCarReqDto } from '../dto/req/create-car.req.dto';

@Injectable()
export class CarService {
  constructor(
    private readonly logger: LoggerService,
    private readonly userRepository: UserRepository,
    private readonly carRepository: CarRepository,
    private readonly statisticRepository: StatisticRepository,
  ) {}

  public async getList(
    userData: IUserData,
    query: CarListReqDto,
  ): Promise<CarListResDto> {
    const [entities, total] = await this.carRepository.getList(
      userData,
      query,
    );
    return CarMapper.toListResponseDTO(entities, total, query);
  }

  public async create(
    userData: IUserData,
    dto: CreateCarReqDto,
  ): Promise<CarResDto> {
    const statistic = await this.createStatistic();
    const car = await this.carRepository.save(
      this.carRepository.create({
        ...dto,
        user_id: userData.userId,
        statistic,
      }),
    );
    return CarMapper.toResponseDTO(car);
  }

  private async createStatistic(): Promise<StatisticEntity> {
    if (!tags || tags.length === 0) return [];

    const entities = await this.Repository.findBy({ name: In(statistic) });
    const existingTags = new Set(entities.map((tag) => tag.name));
    const newTags = statistics.filter((tag) => !existingTags.has(tag));

    const newEntities = await this.tagRepository.save(
      newTags.map((name) => this.tagRepository.create({ name })),
    );
    return [...entities, ...newEntities];
  }

  public async getById(userData: IUserData, carId: string): Promise<CarResDto> {
    const car = await this.carRepository.findCarById(userData, carId);
    if (!car) {
      throw new NotFoundException('Car not found');
    }
    return CarMapper.toResponseDTO(car);
  }

  public async updateById(
    userData: IUserData,
    carId: string,
    dto: UpdateCarReqDto,
  ): Promise<CarResDto> {
    const car = await this.findMyCarByIdOrThrow(
      userData.userId,
      carId,
    );
    await this.carRepository.save({ ...car, ...dto });
    const updatedCar = await this.carRepository.findCarById(
      userData,
      carId,
    );
    return CarMapper.toResponseDTO(updatedCar);
  }

  public async deleteById(
    userData: IUserData,
    carId: string,
  ): Promise<void> {
    const car = await this.findMyCarByIdOrThrow(
      userData.userId,
      carId,
    );
    await this.carRepository.remove(car);
  }

  public async findMyCarByIdOrThrow(
    userId: string,
    carId: string,
  ): Promise<CarEntity> {
    const car = await this.carRepository.findOneBy({
      id: carId,
    });
    if (!car) {
      throw new NotFoundException('Car not found');
    }
    if (car.user_id !== userId) {
      throw new ForbiddenException();
    }
    return car;
  }

  private async findArticleByIdOrThrow(
    carId: string,
  ): Promise<CarEntity> {
    const car = await this.carRepository.findOneBy({ id: carId });
    if (!car) {
      throw new NotFoundException('Car not found');
    }
    return car;
  }
}
