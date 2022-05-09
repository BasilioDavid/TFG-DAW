import {
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class User {
  @IsString()
  @IsOptional()
  @ValidateIf((o) => o.pass)
  @IsNotEmpty({
    groups: ['login'],
  })
  name?: string;

  @IsString()
  @IsOptional()
  @ValidateIf((o) => o.name)
  @IsNotEmpty({
    groups: ['login'],
  })
  pass?: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  rol?: string;

  valid = false;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
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
  @ValidateNested({ each: true, groups: ['login'] })
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

  status: 'processing' | 'rejected' | 'resolved' = 'processing';
}
