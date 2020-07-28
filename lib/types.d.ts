export declare type JobTime = {
    minute?: string;
    hour?: string;
    day?: string;
    weekday?: string;
};
export declare type JobAction = {
    running: boolean;
    timeout: ReturnType<typeof setTimeout>;
};
export declare type Job = {
    name: string;
    time: JobTime;
    method: Function;
    action: JobAction;
};
