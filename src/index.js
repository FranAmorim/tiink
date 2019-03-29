module.exports = class TieTime {
  constructor() {
    this.jobs = {}
  }

  addJob(name, time, method) {
    let action = null;
    this.jobs[name] = [time, action];
    this.setJob(time, method, action)
  }

  setJob(time, method, action) {
    action = setTimeout(() => {
      method()
      this.setJob(time, method)
    }, this.getTime(time))
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
      if (now.getHours() === hour && now.getMinutes() === minute)
        now.setDate(now.getHours() < hour ? now.getDate() : now.getDate() + 1)
      now.setHours(hour ? hour : 0, minute ? minute : 0, 0)
    } else if (weekday.length > 0) {
      let dataIn = weekday.map(item => {
        let data = new Date()
        if (data.getDay() === item)
          data.setDate(data.getDate() + ((7 - data.getDay()) % 7) + item)
        else data.setDate(data.getDate() + ((7 + item - data.getDay()) % 7))
        return data
      })
      now = new Date(Math.min(...dataIn))
    }

    return now.getTime() - timestamp
  }
}
