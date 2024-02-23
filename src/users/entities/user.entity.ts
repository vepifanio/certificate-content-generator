export class User {
  constructor(
    private email: string,
    private password: string,
    private id?: number,
  ) {}

  static create(email: string, password: string) {
    return new User(email, password);
  }

  getId() {
    return this.id;
  }

  getEmail() {
    return this.email;
  }

  getPassword() {
    return this.password;
  }

  setPassword(value: string) {
    this.password = value;
  }
}
