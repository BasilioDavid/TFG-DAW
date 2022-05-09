import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JWTPayload } from './jwt.payload';
import { UserModel } from './user.model';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private jwtService: JwtService
  ) {}

  loginUser(user: string, pass: string): UserModel {
    const userEntity = this.userRepository.findByNameNPassword(user, pass);
    const newToken = this.genetareToken({
      userName: userEntity.name,
      rol: userEntity.rol,
    });
    return UserModel.fromEntity(userEntity, newToken);
  }

  registerUser(user: string, pass: string): UserModel {
    const userEntity = this.userRepository.register(user, pass);
    const newToken = this.genetareToken({
      userName: userEntity.name,
      rol: userEntity.rol,
    });
    return UserModel.fromEntity(userEntity, newToken);
  }

  async checkToken(token: string): Promise<UserModel> {
    //TODO: type this
    const user = this.jwtService.verify(token);
    const newToken = this.genetareToken({ userName: user.name, rol: user.rol });
    return new UserModel(user.name, '', user.rol, newToken);
  }

  genetareToken(jwtPayload: JWTPayload): string {
    return this.jwtService.sign(jwtPayload);
  }
}
