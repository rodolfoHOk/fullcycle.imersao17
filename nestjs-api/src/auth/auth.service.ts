import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

const users = [
  {
    id: 1,
    username: 'john',
    password: 'john123',
  },
  {
    id: 2,
    username: 'chris',
    password: 'chris456',
  },
];

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  login(username: string, password: string) {
    const authUser = users.find(
      (user) => user.username === username && user.password === password,
    );

    if (!authUser) {
      throw new UnauthorizedException();
    }

    const payload = { sub: authUser.id, username: authUser.username };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
