import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
@Controller('auth')
export class AuthController {
  constructor(private readonly jwtService: JwtService) { }

  @Post('login')
  @UseGuards(AuthGuard('local'))
  async login(@Req() req) {
    const { id, email } = req.user;
    const token = this.jwtService.sign({ id, email });
    return {token};
  }

  @Get('getUserInfo')
  @UseGuards(AuthGuard('jwt'))
  getUserInfo(@Req() req, ) {
    const { id, email } = req.user;
    const token = this.jwtService.sign({ id, email });
    return {id, email, token};
  }
}