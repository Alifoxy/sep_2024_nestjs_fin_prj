import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';

import { GlobalExceptionFilter } from './common/http/global-exception.filter';
import configuration from './configs/configs';
import { CarModule } from './modules/car/car.module';
import { AuthModule } from './modules/auth/auth.module';
import { FileStorageModule } from './modules/file-storage/file-storage.module';

import { LoggerModule } from './modules/logger/logger.module';
import { MysqlModule } from './modules/mysql/mysql.module';
import { RedisModule } from './modules/redis/redis.module';
import { RepositoryModule } from './modules/repository/repository.module';
import { StatisticModule } from './modules/statistic/statistic.module';
import { UsersModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    RepositoryModule,
    LoggerModule,
    MysqlModule,
    RedisModule,
    AuthModule,
    UsersModule,
    CarModule,
    StatisticModule,
    FileStorageModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule {}
