import { getTime } from './utils/utils';
import { Job, JobTime, JobAction } from './types';

export class Tiink {
  private jobs: Map<string, Job> = new Map();

  addJob(name: string, time: JobTime, method: Function): void {
    const job = this.jobs.get(name);
    if (job && job.action.running) {
      clearTimeout(job.action.timeout);
    }

    this.jobs.set(name, {
      name,
      time,
      method,
      action: this.setJobAction(name, time, method),
    });
  }

  setJobAction(name: string, time: JobTime, method: Function): JobAction {
    return {
      running: true,
      timeout: setTimeout(() => {
        method();
        const job = this.jobs.get(name);
        if (this.jobs.has(name) && job) {
          job.action = this.setJobAction(name, time, method);
        }

      }, getTime(time))
    }
  }

  stopJob(name: string) {
    const job = this.jobs.get(name);
    if (job && job.action.running) {
      job.action.running = false;
      clearTimeout(job.action.timeout);
    }
  }

  restartJob(name: string): void {
    const job = this.jobs.get(name);
    if (job) {
      if (job.action.running) {
        clearTimeout(job.action.timeout);
      }
      job.action = this.setJobAction(job.name, job.time, job.method);
    }
  }

  deleteJob(name: string): void {
    this.jobs.delete(name);
  }
}