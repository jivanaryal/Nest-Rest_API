import { JwtService } from '@nestjs/jwt';
import { UserService } from './../user/user.service';
import { Injectable } from '@nestjs/common';
import { LoginDto } from 'login.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly UserService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.UserService.findByEmail(email);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    const payload = { username: user.email, sub: user.id, role: user.role }; // `sub` is usually the user ID
    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
    });
    return {
      accessToken,
    };
  }
}
