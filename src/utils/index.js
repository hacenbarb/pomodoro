import dayjs from "dayjs";
import objectSupport from "dayjs/plugin/objectSupport";
dayjs.extend(objectSupport);

export function getMinutesString(dayjsObject) {
  return dayjsObject.minute().valueOf();
}
export function getSecondsString(dayjsObject) {
  return dayjsObject.second().valueOf();
}