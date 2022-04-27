import { UserDTO } from './user.dto';

export class UserIncomingDto extends UserDTO {
  constructor(
    id: string,
    name: string,
    role: string,
    public readonly password: string,
  ) {
    super(id, name, role);
  }
}
