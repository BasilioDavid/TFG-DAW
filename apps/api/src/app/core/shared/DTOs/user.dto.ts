export class UserDTO {
  constructor(
    public id: string,
    public readonly name: string,
    public readonly role: string,
  ) {}
}
