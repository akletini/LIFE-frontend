export class Tag {
  public id?: number | undefined;
  public name?: string;
  public color?: string;

  constructor();
  constructor(name: string, color: string, id?: number);
  constructor(name?: string, color?: string, id?: number);
  constructor(name?: string, color?: string, id?: number) {
    this.name = name;
    this.color = color;
    this.id = id;
  }
}

export default Tag;
