import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JWTPayload } from './jwt.payload';
import { UserIncomingDto } from '../../shared/DTOs/user-incoming.dto';
import { UserDTO } from '../../shared/DTOs/user.dto';
import { UsersService } from '../../shared/services/user.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  registerUser(user: UserIncomingDto): Promise<UserDTO> {
    return this.usersService.newUser(user);
  }

  async validateUser(username: string, pass: string): Promise<boolean> {
    //TODO: add jwt validations
    return this.usersService.validateUser(username, pass);
  }

  async generateAccessToken(name: string) {
    const user = await this.usersService.getUserByName(name);
    const payload: JWTPayload = { userId: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async logged(token: string) {
    try {
      const payload = this.jwtService.verify(token);

      const newToken = this.generateAccessToken(payload.userId);

      return { token: newToken };
    } catch (e) {
      throw new UnauthorizedException('Token expired');
    }
  }
}
