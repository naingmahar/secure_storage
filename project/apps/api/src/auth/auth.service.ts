import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signIn(
    username: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(username);

    if (user?.publicKey !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.email,name: user.name };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}