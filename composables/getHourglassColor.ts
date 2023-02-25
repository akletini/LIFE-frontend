export function determineHourglassColor(dueAt: string | undefined) {
  const dateUtils = new DateUtils();
  if (dueAt == undefined) {
    return;
  }
  const date = new Date(dateUtils.getDateForDatepicker(dueAt));
  const current = new Date(Date.now());
  const diffTime = date.valueOf() - current.valueOf();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  let classVal = "";
  if (diffDays <= 3 && diffDays > 0) {
    classVal = "text-orange-400 border-orange-400";
  } else if (diffDays <= 0) {
    classVal = "text-red-500 border-red-500";
  } else {
    classVal = "text-green-700 border-green-700";
  }
  return classVal;
}
