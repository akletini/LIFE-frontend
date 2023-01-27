export class Tag {
  private _id?: number | undefined;
  private _name?: string;
  private _color?: string;

  constructor(name: string, color: string, id?: number);
  constructor(name: string, color: string, id: number) {
    this._name = name;
    this._color = color;
    this._id = id;
  }

  public get id(): number | undefined {
    return this._id;
  }

  public set id(value: number | undefined) {
    this._id = value;
  }

  public get name(): string | undefined {
    return this._name;
  }

  public set name(value: string | undefined) {
    this._name = value;
  }

  public get color(): string | undefined {
    return this._color;
  }

  public set color(value: string | undefined) {
    this._color = value;
  }
}

export default Tag;
