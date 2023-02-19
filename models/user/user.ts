import TokenContainer from "./tokenContainer"
export class User {
  public id?: number | undefined;
  public name!: string;
  public email!: string;
  public imageUrl?: string;
  public password?: string | undefined;
  public loggedIn: boolean = false;
  public authProvider!: User.AuthProvider;
  public tokenContainer?: TokenContainer;

  constructor() {}
}

export namespace User {
  export enum AuthProvider {
    CREDENTIALS = "CREDENTIALS",
    GOOGLE = "GOOGLE",
  }
}

export default User;
