import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateUserService } from './services/create-user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private createUserService: CreateUserService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.createUserService.execute(createUserDto);
  }
}
