import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './login.dto';
import { UserIncomingDto } from '../../shared/DTOs/user-incoming.dto';
import { UserDTO } from '../../shared/DTOs/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(
    @Body() { username, passwd }: LoginDTO
  ): Promise<{ access_token: string }> {
    const valid = await this.authService.validateUser(username, passwd);
    if (!valid) {
      //TODO: change this
      throw new UnauthorizedException();
    }
    return await this.authService.generateAccessToken(username);
  }

  @Post('register')
  //TODO: insert validations
  register(@Body() userIncomingDto: UserIncomingDto): Promise<UserDTO> {
    return this.authService.registerUser(userIncomingDto);
  }
}
