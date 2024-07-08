import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { IUserData } from '../auth/interfaces/user-data.interface';
import { CarListReqDto } from './dto/req/car-list.req.dto';
import { CarResDto } from './dto/res/car.res.dto';
import { CarListResDto } from './dto/res/car-list.res.dto';
import { CarService } from './services/car.service';
import { CreateCarReqDto } from './dto/req/create-car.req.dto';
import { UpdateCarReqDto } from './dto/req/update-car.req.dto';

@ApiBearerAuth()
@ApiTags('Articles')
@Controller('articles')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @Get()
  public async getList(
    @CurrentUser() userData: IUserData,
    @Query() query: CarListReqDto,
  ): Promise<CarListResDto> {
    return await this.carService.getList(userData, query);
  }

  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @Post()
  public async create(
    @CurrentUser() userData: IUserData,
    @Body() dto: CreateCarReqDto,
  ): Promise<CarResDto> {
    return await this.carService.create(userData, dto);
  }

  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @Get(':carId')
  public async getById(
    @CurrentUser() userData: IUserData,
    @Param('carId', ParseUUIDPipe) carId: string,
  ): Promise<CarResDto> {
    return await this.carService.getById(userData, carId);
  }

  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @Put(':carId')
  public async updateById(
    @CurrentUser() userData: IUserData,
    @Param('carId', ParseUUIDPipe) carId: string,
    @Body() dto: UpdateCarReqDto,
  ): Promise<CarResDto> {
    return await this.carService.updateById(userData, carId, dto);
  }

  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':carId')
  public async deleteById(
    @CurrentUser() userData: IUserData,
    @Param('carId', ParseUUIDPipe) carId: string,
  ): Promise<void> {
    await this.carService.deleteById(userData, carId);
  }

}
