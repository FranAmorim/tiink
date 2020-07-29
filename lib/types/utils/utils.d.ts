import { JobTime } from '../types';
declare const getTime: (time: JobTime) => number;
declare const getTimeRelativeTo: (time: JobTime, target?: Date) => number;
export { getTime, getTimeRelativeTo, };
