import Tag from "./tag";

export class Todo {
  private _id?: number | undefined;
  private _title?: String;
  private _description?: String;
  private _tag?: Tag;
  private _createdAt?: string;
  private _dueAt?: string;
  private _fileAttachment?: File;
  private _state?: Todo.State;

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
  ) {
    this._id = id;
    this._title = title;
    this._description = description;
    this._createdAt = createdAt;
    this._dueAt = dueAt;
    this._state = state;
    this._tag = tag;
  }

  public get id(): number | undefined {
    return this._id;
  }
  public set id(value: number | undefined) {
    this._id = value;
  }

  public get title(): String | undefined {
    return this._title;
  }

  public set title(value: String | undefined) {
    this._title = value;
  }

  public get description(): String | undefined {
    return this._description;
  }

  public set description(value: String | undefined) {
    this._description = value;
  }

  public get createdAt(): string | undefined {
    return this._createdAt;
  }

  public set createdAt(value: string | undefined) {
    this._createdAt = value;
  }

  public get dueAt(): string | undefined {
    return this._dueAt;
  }

  public set dueAt(value: string | undefined) {
    this._dueAt = value;
  }

  public get fileAttachment(): File | undefined {
    return this._fileAttachment;
  }

  public set fileAttachment(value: File | undefined) {
    this._fileAttachment = value;
  }

  public get state(): Todo.State | undefined {
    return this._state;
  }

  public set state(value: Todo.State | undefined) {
    this._state = value;
  }

  public get tag(): Tag | undefined {
    return this._tag;
  }

  public set tag(tag: Tag | undefined) {
    this._tag = tag;
  }
}

export namespace Todo {
  export enum State {
    OPEN = "OPEN",
    DONE = "DONE",
  }
}

export default Todo;
