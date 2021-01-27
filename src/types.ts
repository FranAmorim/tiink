export interface JobTime {
  minute: number | string;
  hour: number | string;
  weekday: number[];
}

export type JobAction = {
  running: boolean;
  timeout: ReturnType<typeof setTimeout>;
}

export interface Job {
  name: string;
  time: JobTime;
  repeat: boolean;
  method?: () => void;
  action?: JobAction;
}

export enum Weekday {
  Monday = 'Monday',
  Tuesday = 'Tuesday',
  Wednesday = 'Wednesday',
  Thursday = 'Thursday',
  Friday = 'Friday',
  Saturday = 'Saturday',
  Sunday = 'Sunday',
}