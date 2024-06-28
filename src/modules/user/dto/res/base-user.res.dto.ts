import { ApiProperty } from '@nestjs/swagger';
import { CarEntity } from '../../../../database/entities/car.entity';

export class BaseUserResDto {
  @ApiProperty({
    example: '121324354678976543fdg',
    description: 'The id of the User',
  })
  id: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'The name of the User',
  })
  public readonly name: string;

  @ApiProperty({
    example: 'test@.gmail.com',
    description: 'The email of the User',
  })
  public readonly email: string;

  @ApiProperty({
    example: 'This is a bio',
    description: 'The bio of the User',
  })
  public readonly bio?: string;

  @ApiProperty({
    example: 'base/premium',
    description: 'The account type of the User ',
  })
  public readonly account: string;

  @ApiProperty({
    example: 'car',
    description: 'All cars of the User ',
  })
  public readonly cars: CarEntity[];
}
