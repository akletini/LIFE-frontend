import User from "../user/user";

export class Chore {
  public id?: number | undefined;
  public title?: string;
  public description?: string;
  public dueAt?: string;
  public createdAt?: string;
  public interval?: number;
  public assignedUser?: User;
}

export default Chore;
