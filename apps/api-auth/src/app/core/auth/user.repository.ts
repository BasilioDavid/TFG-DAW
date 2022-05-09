import { UserEntity } from './user.entity';
import { v4 as uuidV4 } from 'uuid';

export class UserRepository {
  private users: UserEntity[] = [
    {
      id: uuidV4(),
      name: 'Manuel',
      rol: 'admin',
      pass: '1234',
    },
    {
      id: uuidV4(),
      name: 'Manuel',
      rol: 'plain',
      pass: '1234',
    },
  ];

  findByNameNPassword(name: string, pass: string): UserEntity {
    const user = this.users.find(
      (user) => name === user.name && pass === user.pass
    );
    if (!user) {
      //TODO: change error
      throw new Error("User doesn't exist");
    }
    return UserEntity.fromEntity(user);
  }

  register(name: string, pass: string): UserEntity {
    //TODO: check token
    //TODO: extract uuid from code
    const user2Add = new UserEntity(uuidV4(), name, pass, 'plain');
    this.users.push(user2Add);
    return UserEntity.fromEntity(user2Add);
  }
}
