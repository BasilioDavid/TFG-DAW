import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { environment } from '../shared/environment';
import { UserRepository } from './user.repository';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: environment.JWT_SECRET,
      signOptions: { expiresIn: environment.JWT_EXPIRATION_TIME },
    }),
  ],
  providers: [AuthService, UserRepository],
  controllers: [AuthController],
})
export class AuthModule {}
