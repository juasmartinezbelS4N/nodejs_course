class EventEmitter {
  listeners = {} // key-value pair

  addListener(eventName, fn) {
    const eventListener = this.listeners[eventName]
    if (eventListener) {
      eventListener.push(fn)
    } else {
      this.listeners[eventName] = [fn]
    }
  }

  on(eventName, fn) {
    this.addListener(eventName, fn)
  }

  removeListener(eventName, fn) {
    const events = this.listeners[eventName] || [];
    const eventsLength = events.length
    if (eventsLength === 0) return;
    for(const index in events) {
      if (events[index] === fn) {
        events.splice(index, 1);
        return
      }
    }
  }

  off(eventName, fn) {
    this.removeListener(eventName, fn);
  }

  once(eventName, fn) {
    const onceFunction = () => {
      fn();
      this.off(eventName, onceFunction);
    }
    this.on(eventName, onceFunction);
  }

  emit(eventName, ...args) {
    const events = this.listeners[eventName] || [];
    if (events.length === 0) return;
    events.forEach((event) => {
      event(...args);
    });
  }

  listenerCount(eventName) {
    return this.rawListeners(eventName).length
  }

  rawListeners(eventName) {
    const events = this.listeners[eventName] || []
    return events
  }
}

export default EventEmitter;
