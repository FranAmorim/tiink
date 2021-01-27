import { JobTime } from '../types';

const getTime = (time: JobTime) => {
  return getTimeRelativeTo(time);
};

const getTimeRelativeTo = (time: JobTime, target: Date = new Date()) => {
  const { minute, hour, weekday } = time;
  const targetDate = new Date(target);
  const timestamp = targetDate.getTime();

  const toHour = (hour === '*') ? targetDate.getHours() + 1 : hour as number;
  const toMinute = (minute === '*') ? targetDate.getMinutes() + 1 : minute as number;

  if (toHour > targetDate.getHours()
    || !(toHour === targetDate.getHours() && toMinute > targetDate.getMinutes())) {
    targetDate.setDate(getDay(targetDate, weekday));
  }

  const finalDate = new Date(Date.UTC(
    targetDate.getFullYear(),
    targetDate.getMonth(),
    targetDate.getDate(),
    toHour,
    toMinute,
    0,
    0,
  ));

  return (finalDate.getTime() + (finalDate.getTimezoneOffset() * 60000)) - timestamp;
}

const getDay = (
  targetDate: Date,
  weekdayOpts: number[] = [],
): number => {
  if (weekdayOpts.length > 0) {
    if (Array.isArray(weekdayOpts) && weekdayOpts.length > 0) {
      const safeTargetWeekdays = Array
        .from(new Set(weekdayOpts.map((day: any) => parseInt(day, 10))))
        .filter((targetWeekday: any) => targetWeekday >= 0 && targetWeekday <= 6)
        .sort();
      const nextDays = safeTargetWeekdays.filter((targetWeekday: any) => targetWeekday > targetDate.getDay());

      if (nextDays.length > 0) {
        // set date to next requested day
        return targetDate.getDate() + nextDays[0] - targetDate.getDay();
      } else {
        // set date to next first requested day, but from next week
        return targetDate.getDate() + safeTargetWeekdays[0] - targetDate.getDay() + 7;
      }
    }
  }
  return targetDate.getDate() + 1;
}

export {
  getTime,
  getTimeRelativeTo,
  getDay
};
