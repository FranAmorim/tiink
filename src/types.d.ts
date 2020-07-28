export type JobTime = {
  minute?: string ;
  hour?: string;
  day?: string;
  weekday?: string;
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
