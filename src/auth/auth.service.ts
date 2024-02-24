import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { FindUserByEmailService } from 'src/users/services/find-user-by-email.service';
import { LoginDto } from './dto/loginDto';

@Injectable()
export class AuthService {
  constructor(
    private findUserByEmailService: FindUserByEmailService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.findUserByEmailService.execute(email);
    if (!user) {
      throw new BadRequestException('Invalid email or password');
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.getPassword(),
    );
    if (!isPasswordCorrect) {
      throw new BadRequestException('Invalid email or password');
    }

    return this.generateToken(user);
  }

  async generateToken(user: any) {
    const payload = {
      email: user.email,
      sub: user.id,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
