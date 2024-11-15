// EventEmitter class
class EventEmitter {
    constructor() {
      this.events = {};
    }
  
    // Register an event listener
    on(event, listener) {
      if (!this.events[event]) {
        this.events[event] = [];
      }
      this.events[event].push(listener);
    }
  
    // Emit an event, triggering all listeners
    emit(event, data) {
      if (this.events[event]) {
        this.events[event].forEach(listener => listener(data));
      }
    }
  
    // Remove an event listener
    off(event, listener) {
      if (!this.events[event]) return;
  
      this.events[event] = this.events[event].filter(l => l !== listener);
    }
  }
  
  // Create a new EventEmitter instance
  const eventEmitter = new EventEmitter();
  
  // Example listener for "message" event
  function onMessageReceived(data) {
    console.log("Message Received:", data);
  }
  
  // Register the listener
  eventEmitter.on('message', onMessageReceived);
  
  // Trigger the "message" event with data
  document.getElementById('triggerEvent').addEventListener('click', () => {
    eventEmitter.emit('message', { text: 'Hello, this is an event!' });
  });
  