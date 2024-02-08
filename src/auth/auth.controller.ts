import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
@Controller('auth')
export class AuthController {
  constructor(private readonly jwtService: JwtService) { }

  /*
    {
      "email": "eraybahcegulu@gmail.com",
      "password": "eraybahcegulu"
    }
  */
  @Post('login')
  @UseGuards(AuthGuard('local'))
  async login(@Req() req) {
    const { id, email } = req.user;
    const token = this.jwtService.sign({ id, email });
    return { token };
  }

  /*
    {
      Headers.authorization => Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJlcmF5YmFoY2VndWx1QGdtYWlsLmNvbSIsImlhdCI6MTcwNzM5NTc3Nn0.ktR9X2-_Q732E35SrTS6jnC9HTrz-2DtIjZq7Eb98Gg
    }
  */
  @Get('getUserInfo')
  @UseGuards(AuthGuard('jwt'))
  getUserInfo(@Req() req,) {
    const { id, email } = req.user;
    const token = this.jwtService.sign({ id, email });
    return { id, email, token };
  }
}