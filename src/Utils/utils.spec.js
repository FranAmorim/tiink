/* globals test, expect */
import { getTimeRelativeTo } from './utils';

const normalRelativeDate = new Date(2010, 10, 10, 10, 10, 10, 1000);
const zeroedRelativeDate = new Date(2010, 0, 1, 0, 0, 0, 0);

test('get correct times with zero\'d date', () => {
  expect(getTimeRelativeTo({ minute: '*' }, zeroedRelativeDate)).toBe(60000);
  expect(getTimeRelativeTo({ hour: '*' }, zeroedRelativeDate)).toBe(3540000);
  expect(getTimeRelativeTo({ weekday: '*' }, zeroedRelativeDate)).toBe(82800000);
  expect(getTimeRelativeTo({ weekday: [1] }, zeroedRelativeDate)).toBe(172800000);
  expect(getTimeRelativeTo({ weekday: [2] }, zeroedRelativeDate)).toBe(259200000);
  expect(getTimeRelativeTo({ weekday: [3] }, zeroedRelativeDate)).toBe(345600000);
  expect(getTimeRelativeTo({ weekday: [4] }, zeroedRelativeDate)).toBe(432000000);
  expect(getTimeRelativeTo({ weekday: [5] }, zeroedRelativeDate)).toBe(518400000);
  expect(getTimeRelativeTo({ weekday: [6] }, zeroedRelativeDate)).toBe(604800000);
  expect(getTimeRelativeTo({ weekday: [7] }, zeroedRelativeDate)).toBe(86400000);
  expect(getTimeRelativeTo({ weekday: [1, 2, 3, 4, 5, 6, 7] }, zeroedRelativeDate)).toBe(86400000);
});

test('get correct times with normal date', () => {
  expect(getTimeRelativeTo({ minute: '*' }, normalRelativeDate)).toBe(49000);
  expect(getTimeRelativeTo({ hour: '*' }, normalRelativeDate)).toBe(2940000);
  expect(getTimeRelativeTo({ weekday: '*' }, normalRelativeDate)).toBe(46800000);
  expect(getTimeRelativeTo({ weekday: [1] }, normalRelativeDate)).toBe(345600000);
  expect(getTimeRelativeTo({ weekday: [2] }, normalRelativeDate)).toBe(432000000);
  expect(getTimeRelativeTo({ weekday: [3] }, normalRelativeDate)).toBe(518400000);
  expect(getTimeRelativeTo({ weekday: [4] }, normalRelativeDate)).toBe(604800000);
  expect(getTimeRelativeTo({ weekday: [5] }, normalRelativeDate)).toBe(86400000);
  expect(getTimeRelativeTo({ weekday: [6] }, normalRelativeDate)).toBe(172800000);
  expect(getTimeRelativeTo({ weekday: [7] }, normalRelativeDate)).toBe(259200000);
  expect(getTimeRelativeTo({ weekday: [1, 2, 3, 4, 5, 6, 7] }, normalRelativeDate)).toBe(86400000);
});

test('get same times for single vs multiple weekdays', () => {
  expect(getTimeRelativeTo({ weekday: [1, 2, 3, 4, 5, 6, 7] }, normalRelativeDate))
    .toBe(getTimeRelativeTo({ weekday: [5] }, normalRelativeDate));

  expect(getTimeRelativeTo({ weekday: [7] }, zeroedRelativeDate))
    .toBe(getTimeRelativeTo({ weekday: [1, 2, 3, 4, 5, 6, 7] }, zeroedRelativeDate));
});
