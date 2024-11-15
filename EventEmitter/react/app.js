import React, { useEffect, useState } from "react";

// EventEmitter class
class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(event, listener) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(listener);
  }

  emit(event, data) {
    if (this.events[event]) {
      this.events[event].forEach(listener => listener(data));
    }
  }

  off(event, listener) {
    if (!this.events[event]) return;

    this.events[event] = this.events[event].filter(l => l !== listener);
  }
}

// Event Emitter instance
const eventEmitter = new EventEmitter();

const App = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Listener for "message" event
    const onMessageReceived = (data) => {
      setMessage(data.text);
    };

    // Register the listener
    eventEmitter.on('message', onMessageReceived);

    // Cleanup listener on unmount
    return () => {
      eventEmitter.off('message', onMessageReceived);
    };
  }, []);

  const handleClick = () => {
    // Emit event with some data
    eventEmitter.emit('message', { text: 'Hello from EventEmitter in React!' });
  };

  return (
    <div>
      <h1>Event Emitter in React</h1>
      <button onClick={handleClick}>Trigger Event</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default App;
