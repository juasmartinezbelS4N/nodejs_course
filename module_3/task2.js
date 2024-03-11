import fs from "fs"
import EventEmitter from "./eventEmitter.js"

class WithTime extends EventEmitter {
  execute(asyncFunc, ...args) {
    console.time("execute(asyncFunc, ...args)")
    this.emit("begin")
    const cb = (err, data) => {
      if (err) {
        throw new Error(err)
      }
      this.emit("data", data)
      this.emit("end")
      console.timeEnd("execute(asyncFunc, ...args)")
    }
    asyncFunc(...args, cb)
  }
}

const fetchFromUrl = (url, cb) => {
  fetch(url)
    .then((res) => res.json())
    .then((parsedRes) => {
      cb(null, parsedRes);
    }).catch((err) => {
      cb(err);
    })
}

const withTime = new WithTime()

withTime.on("begin", () => console.log("About to execute"))
withTime.on("data", (data) => console.log("Data:", data))
withTime.on("end", () => console.log("Done with execute"))

withTime.execute(fetchFromUrl, "https://jsonplaceholder.typicode.com/posts/1")

console.log(withTime.rawListeners("end"))
