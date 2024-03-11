import EventEmitter from "./eventEmitter.js";

class WithTime extends EventEmitter {
  execute(asyncFunc, ...args) {
      // emit event start, end, data received
      // call asyncFunc with args specified
      // compute the time it takes to execute asyncFunc
  }
}

const fetchFromUrl = (url, cb) => {
  // fetch from https://jsonplaceholder.typicode.com/posts/1
  // transform to JSON
}


const withTime = new WithTime();

withTime.on('begin', () => console.log('About to execute'));
withTime.on('end', () => console.log('Done with execute'));

withTime.execute(fetchFromUrl, 'https://jsonplaceholder.typicode.com/posts/1');

console.log(withTime.rawListeners("end"));