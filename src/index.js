import { getTime } from './utils/utils';

export class TeaTime {
  constructor() {
    this.jobs = new Map();
  }
  
  /**
   * @description Adds a job
   *
   * @param {String} name Job name
   * @param {Object} time Time consists of day, minute, hour
   * @param {Function} method Function invoked when adding a job
   */
  addJob(name, time, method) {
    if (this.jobs.has(name) && 'action' in this.jobs.get(name)) {
      clearTimeout(this.jobs[name].action);
    }

    this.jobs.set(name, {
      time,
      action: this.setJob(name, time, method),
    });
  }

  /**
   * @description Sets a job
   *
   * @param {String} name Job name
   * @param {Object} time Time consists of day, minute, hour
   * @param {Function} method Function invoked when setting a job
   */
  setJob(name, time, method) {
    return setTimeout(() => {
      method();
      this.jobs.get(name).action = this.setJob(name, time, method);
    }, getTime(time));
  }

  /**
   * @description Stops a job
   *
   * @param {String} name Job name
   */
  stopJob(name) {
    clearTimeout(this.jobs.get(name).action);
  }

  /**
   * @description Restarts a job
   *
   * @param {String} name Job name
   */
  restartJob(name) {
    this.jobs.get(name).action();
  }

  /**
   * @description Deletes a job
   *
   * @param {String} name Job name
   */
  deleteJob(name) {
    this.jobs.delete(name);
  }
}
