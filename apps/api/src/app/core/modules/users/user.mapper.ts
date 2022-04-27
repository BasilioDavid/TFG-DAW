import { Injectable } from '@nestjs/common';
import { UserDTO } from '../../shared/DTOs/user.dto';
import { UserEntity } from './user.entity';
import { UserIncomingDto } from '../../shared/DTOs/user-incoming.dto';

@Injectable()
export class UserMapper {
  dtoToEntity(userDTO: UserIncomingDto): UserEntity {
    return new UserEntity(
      userDTO.id,
      userDTO.name,
      userDTO.role,
      userDTO.password
    );
  }

  entityToDto(userEntity: UserEntity): UserDTO {
    return new UserDTO(userEntity.id, userEntity.name, userEntity.role);
  }
}
