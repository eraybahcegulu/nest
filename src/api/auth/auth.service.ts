import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findOne(email);

    if (user) {
      const passwordIsMatch = await argon2.verify(user.password, password);
      if (passwordIsMatch) {
        return user;
      }
    }

    throw new UnauthorizedException('Invalid email or password');
  }
}