/**
 * Return number of milliseconds for the expected time.
 *
 * @param {Object} time
 * @param {number|string} time.minute
 * @param {number|string} time.hour
 * @param {number[]|string} time.weekday
 */
const getTime = (time) => {
  return getTimeRelativeTo(time);
};

const getTimeRelativeTo = (time, target = new Date()) => {
  const { minute, hour, weekday } = time;
  const targetDate = new Date(target);
  const timestamp = targetDate.getTime();

  if (minute === '*') {
    targetDate.setMinutes(targetDate.getMinutes() + 1);
  } else if (hour === '*') {
    targetDate.setHours(targetDate.getHours() + 1);
  } else if (weekday === '*') {
    targetDate.setDate(targetDate.getDate() + 1);
  } else if (Array.isArray(weekday) && weekday.length > 0) {
    const safeTargetWeekdays = Array
      .from(new Set(weekday.map((day) => parseInt(day, 10))))
      .filter((targetWeekday) => targetWeekday >= 0 && targetWeekday <= 6)
      .sort();
    const nextDays = safeTargetWeekdays.filter((targetWeekday) => targetWeekday > targetDate.getDay());

    // console.log();
    // console.log(targetDate, targetDate.getDay(), '»»»', nextDays, ' «» ', safeTargetWeekdays);
    if (nextDays.length > 0) {
      // set date to next requested day
      // console.log('nextDays', targetDate, targetDate.getDate(), targetDate.getDay(), nextDays[0]);
      targetDate.setDate(targetDate.getDate() + nextDays[0] - targetDate.getDay());
      // console.log('nextDays - result', targetDate, targetDate.getTime() - timestamp);
    } else {
      // set date to next first requested day, but from next week
      // console.log('safeTargetDays', targetDate, targetDate.getDate(), targetDate.getDay(), safeTargetWeekdays[0], ' +7');
      targetDate.setDate(targetDate.getDate() + safeTargetWeekdays[0] - targetDate.getDay() + 7);
      // console.log('safeTargetDays - result', targetDate, targetDate.getTime() - timestamp);
    }
  }

  return targetDate.getTime() - timestamp;
}

export {
  getTime,
  getTimeRelativeTo,
};
