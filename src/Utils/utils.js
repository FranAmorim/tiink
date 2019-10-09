/**
* Return number of milliseconds for the expected time.
* @param {Object} time
* @param {number|string} time.minute
* @param {number|string} time.hour
* @param {number|string} time.weekday
*/

const getTime = (time) => {
  const { minute, hour, weekday } = time;
  let now = new Date();
  const timestamp = now.getTime();

  if (minute === '*') {
    now.setHours(
      now.getMinutes() === 59 ? now.getHours() + 1 : now.getHours(),
      now.getMinutes() < 59 ? now.getMinutes() + 1 : 0,
      0,
    );
  } else if (hour === '*') {
    now.setDate(now.getMinutes() === 23 ? now.getDate() + 1 : now.getDate());
    now.setHours(
      now.getHours() < 23 ? now.getHours() + 1 : 0,
      minute ? minute : 0,
      0,
    );
  } else if (weekday === '*') {
    now.setDate((now.getHours() < hour) ? now.getDate() : now.getDate() + 1);
    now.setHours(hour ? hour : 0, minute != null ? minute : 0, 0);
  } else if (weekday.length > 0) {
    const dataIn = weekday.map((item) => {
      const data = new Date();
      if (data.getDay() === item) {
        return data.setDate(data.getDate() + ((7 - data.getDay()) % 7) + item);
      }
      return data.setDate(data.getDate() + ((7 + item - data.getDay()) % 7));
    });
    now = new Date(Math.min(...dataIn));
  }

  return now.getTime() - timestamp;
};

export {
  getTime,
};
