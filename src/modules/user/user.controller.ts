import { Controller, Get, Req } from '@nestjs/common';
import { UserResDto } from './dto/res/user.res.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}
  @Get('users')
  findAll(): Promise<UserResDto> {
  }
}

