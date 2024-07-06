import { ApiProperty } from '@nestjs/swagger';

import { UserResDto } from '../../../user/dto/res/user.res.dto';

export class CarResDto {
  @ApiProperty({
    example: '796cea24-a328-4463-a5e1-85a779e4780f',
    description: 'Car ID',
  })
  id: string;

  @ApiProperty({
    example: 'BMW',
    description: 'Car Brand',
  })
  brand: string;

  @ApiProperty({
    example: 'Car Model',
    description: 'Article Description',
  })
  model: string;

  @ApiProperty({
    example: 'Article Body',
    description: 'Article Body',
  })
  body: string;

  @ApiProperty({
    example: '2021-09-29T10:00:00.000Z',
    description: 'Article Created Date',
  })
  created: Date;

  @ApiProperty({
    example: '2021-09-29T10:00:00.000Z',
    description: 'Article Updated Date',
  })
  updated: Date;

  @ApiProperty({
    example: ['tag1', 'tag2'],
    description: 'Article Tags',
  })
  tags: string[];

  @ApiProperty({
    example: true,
    description: 'Is Article Liked',
  })
  isLiked: boolean;

  user?: UserResDto;
}
