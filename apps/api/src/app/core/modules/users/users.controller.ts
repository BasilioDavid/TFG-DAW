import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserDTO } from '../../shared/DTOs/user.dto';
import { UsersService } from '../../shared/services/user.service';
import { UserIncomingDto } from '../../shared/DTOs/user-incoming.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getAllUsers(): Promise<UserDTO[]> {
    return this.usersService.getAllUsers();
  }

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<UserDTO> {
    return await this.usersService.getUserById(id);
  }

  @Post()
  newUser(@Body() user: UserIncomingDto): Promise<UserDTO> {
    return this.usersService.newUser(user);
  }

  @Put(':id')
  updateUser(
    @Param('id') id: string,
    @Body() user: UserIncomingDto
  ): Promise<UserDTO> {
    return this.usersService.updateUser(id, user);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<void> {
    return await this.usersService.deleteUser(id);
  }
}
