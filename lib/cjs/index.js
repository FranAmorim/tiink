"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tiink = void 0;
const utils_1 = require("./utils/utils");
class Tiink {
    constructor() {
        this.jobs = new Map();
    }
    addJob(name, time, method) {
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
    setJobAction(name, time, method) {
        return {
            running: true,
            timeout: setTimeout(() => {
                method();
                const job = this.jobs.get(name);
                if (this.jobs.has(name) && job) {
                    job.action = this.setJobAction(name, time, method);
                }
            }, utils_1.getTime(time))
        };
    }
    stopJob(name) {
        const job = this.jobs.get(name);
        if (job && job.action.running) {
            job.action.running = false;
            clearTimeout(job.action.timeout);
        }
    }
    restartJob(name) {
        const job = this.jobs.get(name);
        if (job) {
            if (job.action.running) {
                clearTimeout(job.action.timeout);
            }
            job.action = this.setJobAction(job.name, job.time, job.method);
        }
    }
    deleteJob(name) {
        this.jobs.delete(name);
    }
}
exports.Tiink = Tiink;
