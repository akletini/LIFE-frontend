export class Interval {
  public value?: number;
  public unit?: Interval.DateUnit;

  constructor(value: number, unit: Interval.DateUnit) {
    this.value = value;
    this.unit = unit;
  }
}

export namespace Interval {
  export enum DateUnit {
    DAYS = "DAYS",
    WEEKS = "WEEKS",
    MONTHS = "MONTHS",
  }
}

export default Interval;
