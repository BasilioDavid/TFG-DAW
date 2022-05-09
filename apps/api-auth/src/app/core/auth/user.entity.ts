export class UserEntity {
  id: string;
  name: string;
  pass: string;
  rol: string;

  constructor(id: string, name: string, pass: string, rol: string) {
    this.id = id;
    this.name = name;
    this.pass = pass;
    this.rol = rol;
  }

  static fromEntity(entity: UserEntity): UserEntity {
    return new UserEntity(entity.id, entity.name, entity.pass, entity.rol);
  }
}
