export class CreateUserDto {
  readonly email: string;
  readonly password: string;

  constructor({ email, password }: CreateUserDto) {
    this.email = email;
    this.password = password;
  }
}
