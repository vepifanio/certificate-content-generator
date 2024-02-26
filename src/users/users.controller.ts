import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserService } from './services/create-user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private createUserService: CreateUserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.createUserService.execute(createUserDto);
  }
}
