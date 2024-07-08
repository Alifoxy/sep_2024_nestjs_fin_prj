import { ApiProperty } from '@nestjs/swagger';

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
    example: 'https://www.example.com/avatar.jpg',
    description: 'The avatar of the User',
  })
  public readonly image?: string;

  @ApiProperty({
    example: 'base/premium',
    description: 'The account type of the User ',
  })
  public readonly account: string;

  @ApiProperty({
    example: '3',
    description: 'The amount of cars of the User ',
  })
  public readonly carsCount: number;
}
