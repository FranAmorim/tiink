/* globals test, expect */
import { getTimeRelativeTo } from './utils';

const normalRelativeDate = new Date(2010, 10, 10, 10, 10, 10, 1000);
const zeroedRelativeDate = new Date(2010, 0, 1, 0, 0, 0, 0);

const millisecondsInAMinute = 1 * 60 * 1000;
const millisecondsInAnHour = millisecondsInAMinute * 60;
const millisecondsInAnDay = millisecondsInAnHour * 24;

test('get correct times with zero\'d date', () => {
  // zeroedRelativaDate is weekday 5, so weekday 6 should be millisecondsInADay
  // and every day after equals to the previous + millisecondsInADay
  const millisecondsToDay6 = millisecondsInAnDay;
  const millisecondsToDay0 = millisecondsInAnDay * 2;
  const millisecondsToDay1 = millisecondsInAnDay * 3;
  const millisecondsToDay2 = millisecondsInAnDay * 4;
  const millisecondsToDay3 = millisecondsInAnDay * 5;
  const millisecondsToDay4 = millisecondsInAnDay * 6;
  const millisecondsToDay5 = millisecondsInAnDay * 7;

  expect(getTimeRelativeTo({ minute: '*' }, zeroedRelativeDate))
    .toBe(millisecondsInAMinute);
  expect(getTimeRelativeTo({ hour: '*' }, zeroedRelativeDate))
    .toBe(millisecondsInAnHour);
  expect(getTimeRelativeTo({ weekday: '*' }, zeroedRelativeDate))
    .toBe(millisecondsInAnDay);
  expect(getTimeRelativeTo({ weekday: [0] }, zeroedRelativeDate))
    .toBe(millisecondsToDay0);
  expect(getTimeRelativeTo({ weekday: [1] }, zeroedRelativeDate))
    .toBe(millisecondsToDay1);
  expect(getTimeRelativeTo({ weekday: [2] }, zeroedRelativeDate))
    .toBe(millisecondsToDay2);
  expect(getTimeRelativeTo({ weekday: [3] }, zeroedRelativeDate))
    .toBe(millisecondsToDay3);
  expect(getTimeRelativeTo({ weekday: [4] }, zeroedRelativeDate))
    .toBe(millisecondsToDay4);
  expect(getTimeRelativeTo({ weekday: [5] }, zeroedRelativeDate))
    .toBe(millisecondsToDay5);
  expect(getTimeRelativeTo({ weekday: [6] }, zeroedRelativeDate))
    .toBe(millisecondsToDay6);
  expect(getTimeRelativeTo({ weekday: [0, 1, 2, 3, 4, 5, 6] }, zeroedRelativeDate))
    .toBe(millisecondsToDay6);
});

test('get correct times with normal date', () => {
  // normalRelativaDate is weekday 3, so weekday 4 should be millisecondsInADay
  // and every day after equals to the previous + millisecondsInADay
  const millisecondsToDay4 = millisecondsInAnDay;
  const millisecondsToDay5 = millisecondsInAnDay * 2;
  const millisecondsToDay6 = millisecondsInAnDay * 3;
  const millisecondsToDay0 = millisecondsInAnDay * 4;
  const millisecondsToDay1 = millisecondsInAnDay * 5;
  const millisecondsToDay2 = millisecondsInAnDay * 6;
  const millisecondsToDay3 = millisecondsInAnDay * 7;

  expect(getTimeRelativeTo({ minute: '*' }, normalRelativeDate))
    .toBe(millisecondsInAMinute);
  expect(getTimeRelativeTo({ hour: '*' }, normalRelativeDate))
    .toBe(millisecondsInAnHour);
  expect(getTimeRelativeTo({ weekday: '*' }, normalRelativeDate))
    .toBe(millisecondsInAnDay);
  expect(getTimeRelativeTo({ weekday: [0] }, normalRelativeDate))
    .toBe(millisecondsToDay0);
  expect(getTimeRelativeTo({ weekday: [1] }, normalRelativeDate))
    .toBe(millisecondsToDay1);
  expect(getTimeRelativeTo({ weekday: [2] }, normalRelativeDate))
    .toBe(millisecondsToDay2);
  expect(getTimeRelativeTo({ weekday: [3] }, normalRelativeDate))
    .toBe(millisecondsToDay3);
  expect(getTimeRelativeTo({ weekday: [4] }, normalRelativeDate))
    .toBe(millisecondsToDay4);
  expect(getTimeRelativeTo({ weekday: [5] }, normalRelativeDate))
    .toBe(millisecondsToDay5);
  expect(getTimeRelativeTo({ weekday: [6] }, normalRelativeDate))
    .toBe(millisecondsToDay6);
  expect(getTimeRelativeTo({ weekday: [0, 1, 2, 3, 4, 5, 6] }, normalRelativeDate))
    .toBe(millisecondsToDay4);
});

test('get same times for wildcard vs all weekdays', () => {
  expect(getTimeRelativeTo({ weekday: [1, 2, 3, 4, 5, 6, 7] }, normalRelativeDate))
    .toBe(getTimeRelativeTo({ weekday: '*' }, normalRelativeDate));

  expect(getTimeRelativeTo({ weekday: '*' }, zeroedRelativeDate))
    .toBe(getTimeRelativeTo({ weekday: [1, 2, 3, 4, 5, 6, 7] }, zeroedRelativeDate));
});
