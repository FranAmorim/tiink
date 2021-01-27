import { getTime, getTimeRelativeTo } from './utils/utils';
import { Job, JobTime, JobAction } from './types';

export class Tiink {
  private jobs: Map<string, Job> = new Map();

  addJob(jobProps: Job): void {
    const { name } = jobProps;

    // This will check if there is an existent Job the same name.
    // If there is one stops and overwrite it.
    const job = this.jobs.get(name);
    if (job && job?.action?.running) {
      clearTimeout(job.action.timeout);
    }

    this.jobs.set(name, {
      ...jobProps,
      action: this.setJobAction(jobProps, true),
    });
  }

  setJobAction(jobProps: Job, initial: boolean = false): JobAction {
    const { name, time, method, repeat } = jobProps;
    return {
      running: true,
      timeout: setTimeout(() => {
        method?.();
        const job = this.jobs.get(name);
        if (this.jobs.has(name) && job) {
          if (initial || repeat) {
            job.action = this.setJobAction(jobProps);
          } else {
            this.stopJob(name);
          }
        }

      }, getTime(time))
    }
  }

  stopJob(name: string): void {
    const job = this.jobs.get(name);
    if (job && job?.action?.running) {
      job.action.running = false;
      clearTimeout(job.action.timeout);
    }
  }

  restartJob(name: string): void {
    const job = this.jobs.get(name);
    if (job) {
      if (job?.action?.running) {
        clearTimeout(job.action.timeout);
      }
      job.action = this.setJobAction(job);
    }
  }

  deleteJob(name: string): void {
    this.jobs.delete(name);
  }

  getTimeTo(time: JobTime, date: Date) {
    return getTimeRelativeTo(time, date);
  }
}