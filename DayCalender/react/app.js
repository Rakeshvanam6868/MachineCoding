import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [events, setEvents] = useState({});
  const [selectedTime, setSelectedTime] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [eventInput, setEventInput] = useState("");

  const timeSlots = Array.from({ length: 10 }, (_, index) => `${9 + index}:00`);

  const openModal = (time) => {
    setSelectedTime(time);
    setEventInput(events[time] || "");
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedTime(null);
    setEventInput("");
  };

  const saveEvent = () => {
    setEvents({ ...events, [selectedTime]: eventInput });
    closeModal();
  };

  const deleteEvent = (time) => {
    const updatedEvents = { ...events };
    delete updatedEvents[time];
    setEvents(updatedEvents);
  };

  return (
    <div className="calendar-container">
      <h1>Day Calendar</h1>
      <div className="calendar">
        {timeSlots.map((time) => (
          <div key={time} className="time-slot" onClick={() => openModal(time)}>
            <span>{time}</span>
            {events[time] && (
              <>
                <span className="event">{events[time]}</span>
                <button
                  className="delete-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteEvent(time);
                  }}
                >
                  X
                </button>
              </>
            )}
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-button" onClick={closeModal}>
              &times;
            </button>
            <h2>Add Event</h2>
            <p>Time: {selectedTime}</p>
            <textarea
              value={eventInput}
              onChange={(e) => setEventInput(e.target.value)}
              placeholder="Enter event details"
            />
            <button onClick={saveEvent}>Save</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
