import { getTime } from './utils/utils';

export class TeaTime {
  constructor() {
    this.jobs = {};
  }

  addJob(name, time, method) {
    if (name in this.jobs && 'action' in this.jobs[name]) {
      clearTimeout(this.jobs[name].action);
    }
    this.jobs[name] = {
      time,
      action: this.setJob(name, time, method),
    };
  }

  setJob(name, time, method) {
    return setTimeout(() => {
      method();
      this.jobs[name].action = this.setJob(name, time, method);
    }, getTime(time));
  }

  stopJob(jobName) {
    clearTimeout(this.jobs[jobName].action);
  }
}
