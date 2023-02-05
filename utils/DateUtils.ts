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

  public getCurrentDateTime(date?: Date) {
    if (date == undefined) {
      return dayjs(new Date(Date.now())).format(DateUtils.dateTimeFormat);
    }
    return this.getGermanDateTime(date);
  }

  public getDateForDatepicker(date?: string) {
    if (date == undefined) {
      return dayjs(new Date(Date.now())).format("YYYY-MM-DD");
    }
    date = this.germanDateToDatePicker(date);
    return dayjs(date, DateUtils.dateFormat).format("YYYY-MM-DD");
  }

  public getDateTimeForJS(date?: string) {
    return dayjs(date, DateUtils.dateTimeFormat).format(
      "YYYY-MM-DDTHH:mm:ss.sssZ"
    );
  }

  public getGermanDate(date: string) {
    return dayjs(date).format(DateUtils.dateFormat);
  }

  private getGermanDateTime(date: Date) {
    return dayjs(date).format(DateUtils.dateTimeFormat);
  }

  private germanDateToDatePicker(date: string) {
    let components = date.split(".");
    components = components.reverse();
    return components[0] + "-" + components[1] + "-" + components[2];
  }
}

export default DateUtils;
