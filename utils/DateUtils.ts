import dayjs from "dayjs/esm";

export class DateUtils {
  static dateFormat: string;
  static dateTimeFormat: string;

  constructor() {
    const config = useRuntimeConfig();
    DateUtils.dateFormat = config.public.dateFormat;
    DateUtils.dateTimeFormat = config.public.dateTimeFormat;
  }

  public getCurrentDate() {
    return dayjs(new Date(Date.now())).format(DateUtils.dateFormat);
  }

  public getCurrentDateTime(date?: string) {
    if (date == undefined) {
      return dayjs(new Date(Date.now())).format(DateUtils.dateTimeFormat);
    }
    return this.getGermanDateTime(date);
  }

  public getGermanDate(date: string) {
    return dayjs(date).format(DateUtils.dateFormat);
  }

  private getGermanDateTime(date: string) {
    return dayjs(date).format(DateUtils.dateTimeFormat);
  }
}

export default DateUtils;
