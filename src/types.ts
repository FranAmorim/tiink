export type JobTime = {
  minute: number | string;
  hour: number | string;
  weekday: number[] | string;
}

export type JobAction = {
  running: boolean;
  timeout: ReturnType<typeof setTimeout>;
}

export type Job = {
  name: string;
  time: JobTime;
  method: Function;
  action: JobAction;
}


export enum Weekday {
  Saturday = 'Saturday',
  Friday = 'Friday',
}