import { getTime } from './utils/utils';

export class TeaTime {
  constructor() {
    this.jobs = new Map();
  }

  addJob(name, time, method) {
    if (this.jobs.has(name) && 'action' in this.jobs.get(name)) {
      clearTimeout(this.jobs[name].action);
    }

    this.jobs.set(name, {
      time,
      action: this.setJob(name, time, method),
    });
  }

  setJob(name, time, method) {
    return setTimeout(() => {
      method();
      this.jobs.get(name).action = this.setJob(name, time, method);
    }, getTime(time));
  }

  stopJob(name) {
    clearTimeout(this.jobs.get(name).action);
  }

  restartJob(name) {
    this.jobs.get(name).action();
  }

  deleteJob(name) {
    this.jobs.delete(name);
  }
}
