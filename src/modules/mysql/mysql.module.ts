import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MysqlConnectService } from './mysql-connect.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: MysqlConnectService,
    }),
    // TypeOrmModule.forRootAsync({
    //   useFactory: (configService: ConfigService<Config>) => {
    //     const databaseConfig = configService.get<DatabaseConfig>('database');
    //     return {
    //       type: 'postgres',
    //       host: databaseConfig.host,
    //       port: databaseConfig.port,
    //       username: databaseConfig.user,
    //       password: databaseConfig.password,
    //       database: databaseConfig.dbName,
    //       entities: [AuthEntity, UserEntity],
    //       synchronize: true,
    //     };
    //   },
    //   inject: [ConfigService],
    // }),
  ],
  controllers: [],
  providers: [],
})
export class MysqlModule {}
