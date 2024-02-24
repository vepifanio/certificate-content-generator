export class LoginDto {
  readonly email: string;
  readonly password: string;

  constructor({ email, password }: LoginDto) {
    this.email = email;
    this.password = password;
  }
}
