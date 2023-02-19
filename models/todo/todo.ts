import User from "../user/user";
import Tag from "./tag";

export class Todo {
  public id?: number | undefined;
  public title?: String;
  public description?: String;
  public tag?: Tag;
  public createdAt?: string;
  public dueAt?: string;
  public attachedFile?: File;
  public state?: Todo.State;
  public assignedUser?: User;

  constructor();
  constructor(
    title?: string,
    createdAt?: string,
    dueAt?: string,
    state?: Todo.State
  );
  constructor(
    title?: string,
    createdAt?: string,
    dueAt?: string,
    state?: Todo.State,
    description?: string,
    tag?: Tag
  );
  constructor(
    title?: string,
    createdAt?: string,
    dueAt?: string,
    state?: Todo.State,
    description?: string,
    tag?: Tag,
    id?: number
  );
  constructor(
    title?: string,
    createdAt?: string,
    dueAt?: string,
    state?: Todo.State,
    description?: string,
    tag?: Tag,
    id?: number
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.createdAt = createdAt;
    this.dueAt = dueAt;
    this.state = state;
    this.tag = tag;
  }
}

export namespace Todo {
  export enum State {
    OPEN = "OPEN",
    DONE = "DONE",
  }
}

export default Todo;
