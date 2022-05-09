import { UserEntity } from './user.entity';

export class UserModel {
  name: string;
  pass: string;
  rol: string;
  token: string;

  constructor(name: string, pass: string, rol: string, token: string) {
    this.name = name;
    this.pass = pass;
    this.rol = rol;
    this.token = token;
  }

  static fromEntity(entity: UserEntity, token: string): UserModel {
    //TODO: check this token
    return new UserModel(entity.name, entity.pass, entity.rol, token);
  }
}
