import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { UserMapper } from './user.mapper';
import { UserIncomingDto } from '../../shared/DTOs/user-incoming.dto';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>
  ) {}

  getAllUsers(): Promise<UserEntity[]> {
    return this.usersRepository.find();
  }

  getUserById(id: string): Promise<UserEntity> {
    return this.usersRepository.findOne(id);
  }
  async getUserByName(name: string): Promise<UserEntity> {
    return await this.usersRepository.findOneOrFail({ name });
  }

  newUser(newUser: UserEntity): Promise<UserEntity> {
    return this.usersRepository.save(newUser);
  }

  async updateUser(userEntity: UserEntity): Promise<UserEntity> {
    //TODO: check if I can extract the user without another query
    //TODO: add try catch block
    await this.usersRepository.update(userEntity.id, userEntity);
    return this.usersRepository.findOne(userEntity.id);
  }

  deleteUser(id: string): Promise<DeleteResult> {
    return this.usersRepository.delete(id);
  }
}
