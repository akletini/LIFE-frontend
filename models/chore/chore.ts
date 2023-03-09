import User from "../user/user";
import Interval from "./interval";

export class Chore {
  public id?: number | undefined;
  public title?: string;
  public description?: string;
  public dueAt?: string;
  public createdAt?: string;
  public startDate?: string;
  public lastCompleted?: string;
  public active?: boolean;
  public shiftInterval?: boolean;
  public duration?: number;
  public interval?: Interval;
  public assignedUser?: User;
}

export default Chore;
