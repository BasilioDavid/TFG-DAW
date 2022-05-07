import {
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class User {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  pass?: string;

  @IsString()
  @IsOptional()
  rol?: string;

  valid = false;

  @IsString()
  @IsOptional()
  token?: string;
}

class RejectedFragment {
  @IsString()
  @IsOptional()
  reason?: string;

  @IsString()
  @IsOptional()
  code?: string;
}

class ResolveFragment {
  @IsString()
  @IsOptional()
  code?: string;

  @IsOptional()
  data?: unknown;
}

export class Payload {
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => User)
  user?: User;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => RejectedFragment)
  rejected?: RejectedFragment;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ResolveFragment)
  resolved?: ResolveFragment;

  ended = false;
}
