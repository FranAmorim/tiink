module.exports = class TeaTime {
  constructor() {
    this.jobs = {}
  }

  addJob(name, time, method) {
    if (this.jobs.hasOwnProperty(name) && this.jobs[name].hasOwnProperty('action')) {
      clearTimeout(this.jobs[name].action);
    }
    this.jobs[name] = { 
      time, 
      action: this.setJob(name, time, method)
    };
  }

  setJob(name, time, method) {
    return setTimeout(() => {
      method();
      this.jobs[name].action = this.setJob(name, time, method);
    }, this.getTime(time))
  }

  stopJob(jobName) {
    clearTimeout(this.jobs[jobName].action)
  }

  getTime(time) {
    const { minute, hour, weekday } = time
    let now = new Date()
    const timestamp = now.getTime()

    if (minute === '*') {
      now.setHours(
        now.getMinutes() === 59 ? now.getHours() + 1 : now.getHours(),
        now.getMinutes() < 59 ? now.getMinutes() + 1 : 0,
        0
      )
    } else if (hour === '*') {
      now.setDate(now.getMinutes() === 23 ? now.getDate() + 1 : now.getDate())
      now.setHours(
        now.getHours() < 23 ? now.getHours() + 1 : 0,
        minute ? minute : 0,
        0
      )
    } else if (weekday === '*') {
      now.setDate((now.getHours() < hour) ? now.getDate() : now.getDate() + 1);
      now.setHours((hour) ? hour : 0, minute ? minute : 0, 0);
    } else if (weekday.length > 0) {
      let dataIn = weekday.map(item => {
        let data = new Date();
        if (data.getDay() === item) {
          return data.setDate(data.getDate() + ((7 - data.getDay()) % 7) + item)
        } else {
          return data.setDate(data.getDate() + ((7 + item - data.getDay()) % 7))
        }
      })
      now = new Date(Math.min(...dataIn))
    }

    return now.getTime() - timestamp
  }
}
