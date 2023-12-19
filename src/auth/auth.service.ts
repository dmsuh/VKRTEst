import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserQueryRepository } from '../user/repositories/user-query.repository';
import { UserNotFoundException } from '../user/exceptions/user-not-found.exception';

@Injectable()
export class AuthService {
  constructor(
    private userQueryRepository: UserQueryRepository,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userQueryRepository.findByUsername(username);
    if (user && (await bcrypt.compare(pass, user.passwordHash))) {
      return {
        id: user.id,
        username: user.username,
        userRoleId: user.userRoleId,
      };
    }
    console.log('--------');
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
