import { JobTime, JobAction } from './types';
export declare class Tiink {
    private jobs;
    addJob(name: string, time: JobTime, method: Function): void;
    setJobAction(name: string, time: JobTime, method: Function): JobAction;
    stopJob(name: string): void;
    restartJob(name: string): void;
    deleteJob(name: string): void;
}
