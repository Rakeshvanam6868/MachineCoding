const calendar = document.querySelector(".calendar");
const eventModal = document.getElementById("eventModal");
const selectedTimeDisplay = document.getElementById("selectedTime");
const eventInput = document.getElementById("eventInput");
const saveEventButton = document.getElementById("saveEvent");
const closeModalButton = document.getElementById("closeModal");

let selectedTimeSlot = null;

// Generate time slots
const generateTimeSlots = () => {
  for (let hour = 9; hour <= 18; hour++) {
    const time = `${hour}:00`;
    const timeSlot = document.createElement("div");
    timeSlot.className = "time-slot";
    timeSlot.dataset.time = time;

    const timeLabel = document.createElement("span");
    timeLabel.textContent = time;

    timeSlot.appendChild(timeLabel);
    calendar.appendChild(timeSlot);

    timeSlot.addEventListener("click", () => openModal(timeSlot));
  }
};

// Open modal to add/edit event
const openModal = (timeSlot) => {
  selectedTimeSlot = timeSlot;
  selectedTimeDisplay.textContent = `Time: ${timeSlot.dataset.time}`;
  eventInput.value = timeSlot.querySelector(".event")?.textContent || "";
  eventModal.style.display = "block";
};

// Close modal
const closeModal = () => {
  eventModal.style.display = "none";
};

// Save event
const saveEvent = () => {
  const eventText = eventInput.value.trim();

  if (eventText) {
    let eventElement = selectedTimeSlot.querySelector(".event");
    if (!eventElement) {
      eventElement = document.createElement("span");
      eventElement.className = "event";
      selectedTimeSlot.appendChild(eventElement);

      const deleteButton = document.createElement("button");
      deleteButton.className = "delete-button";
      deleteButton.textContent = "X";
      selectedTimeSlot.appendChild(deleteButton);

      deleteButton.addEventListener("click", (e) => {
        e.stopPropagation();
        deleteEvent(selectedTimeSlot);
      });
    }
    eventElement.textContent = eventText;
  }
  closeModal();
};

// Delete event
const deleteEvent = (timeSlot) => {
  timeSlot.querySelector(".event")?.remove();
  timeSlot.querySelector(".delete-button")?.remove();
};

// Event listeners
closeModalButton.addEventListener("click", closeModal);
saveEventButton.addEventListener("click", saveEvent);
window.addEventListener("click", (e) => {
  if (e.target === eventModal) closeModal();
});

// Initialize calendar
generateTimeSlots();
