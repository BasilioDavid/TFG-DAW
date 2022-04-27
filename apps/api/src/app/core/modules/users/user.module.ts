import { Module } from '@nestjs/common';
import { UserMapper } from './user.mapper';
import { UsersRepository } from './users.repository';
import { UsersController } from './users.controller';
import { UsersService } from '../../shared/services/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, UserMapper],
  exports: [UsersService],
})
export class UsersModule {}
