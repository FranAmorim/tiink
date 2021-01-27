const { getTimeRelativeTo } = require('./utils');

// Wed Aug 12 2020 15:00:00 GMT+0100
const date = new Date(1597240800000);

const job = {
  hour: 15,
  minute: 10,
  weekday: '*',
}

test('Run Job in 10min (600000ms)', () => {
  expect(getTimeRelativeTo(job, date)).toBe(600000);
});


const job2 = {
  hour: 14,
  minute: 10,
  weekday: '*',
}

test('Run Job in 23h & 10min (83400000ms)', () => {
  // 83400000(ms) -> 23h & 10min
  expect(getTimeRelativeTo(job2, date)).toBe(83400000);
});

const job3 = {
  hour: 14,
  minute: 10,
  weekday: [5],
}

test('Run Job in 47h & 10min (83400000ms)', () => {
  // 169800000(ms) -> 47h & 10min
  expect(getTimeRelativeTo(job3, date)).toBe(169800000);
});
