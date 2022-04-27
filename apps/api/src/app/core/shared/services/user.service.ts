import { Injectable } from '@nestjs/common';
import { UserDTO } from '../DTOs/user.dto';
import { UserEntity } from '../../modules/users/user.entity';
import { UserMapper } from '../../modules/users/user.mapper';
import { UsersRepository } from '../../modules/users/users.repository';
import { UserIncomingDto } from '../DTOs/user-incoming.dto';

@Injectable()
export class UsersService {
  constructor(
    private usersRepository: UsersRepository,
    private mapper: UserMapper
  ) {}

  async getAllUsers(): Promise<UserDTO[]> {
    const users: UserEntity[] = await this.usersRepository.getAllUsers();
    return users.map((user) => this.mapper.entityToDto(user));
  }

  async getUserById(id: string): Promise<UserDTO> {
    const user: UserEntity = await this.usersRepository.getUserById(id);
    return this.mapper.entityToDto(user);
  }

  async getUserByName(name: string): Promise<UserDTO> {
    const user = await this.usersRepository.getUserByName(name);
    return this.mapper.entityToDto(user);
  }

  async validateUser(username: string, pass) {
    const user = await this.usersRepository.getUserByName(username);
    return user.validatePassword(pass);
  }

  async newUser(userDTO: UserIncomingDto): Promise<UserDTO> {
    const userEntity = this.mapper.dtoToEntity(userDTO);
    const newUser: UserEntity = await this.usersRepository.newUser(userEntity);
    return this.mapper.entityToDto(newUser);
  }

  async updateUser(id: string, userDTO: UserIncomingDto): Promise<UserDTO> {
    userDTO.id = id;
    const userEntity = this.mapper.dtoToEntity(userDTO);
    const updateUser = await this.usersRepository.updateUser(userEntity);
    return this.mapper.entityToDto(updateUser);
  }

  async deleteUser(id: string): Promise<void> {
    await this.usersRepository.deleteUser(id);
  }
}
