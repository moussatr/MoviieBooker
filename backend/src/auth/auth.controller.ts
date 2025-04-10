/* eslint-disable prettier/prettier */
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/users/user.entity';
// import { JwtStrategy } from '../jwt/jwt.guard';

@Controller('auth')
// @UseGuards(JwtStrategy)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerUser: User) {
    return this.authService.register(registerUser.username, registerUser.email, registerUser.password);
  }

  @Post('login')
async login(@Body() loginUser: User) {
  return this.authService.login(loginUser.email, loginUser.password);
}
}
