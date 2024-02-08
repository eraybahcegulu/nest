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
      Headers.authorization => Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWMwZDg3YWMwNjA2NDE5MWFjYTMxMzkiLCJ1c2VyTmFtZSI6ImVyYXliYWhjZWd1bHUiLCJlbWFpbCI6ImVyYXliYWhjZWd1bHVAZ21haWwuY29tIiwidXNlclJvbGUiOiJhZG1pbiIsImlhdCI6MTcwNzEzOTk5Nn0.FZcVkIwoOldPNodqSpNYfeEOe1nvVibUAOYmMPafu-w
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