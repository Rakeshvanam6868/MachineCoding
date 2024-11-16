const progressBarFill = document.getElementById("progressBarFill");
const startButton = document.getElementById("startButton");
const pauseButton = document.getElementById("pauseButton");
const stopButton = document.getElementById("stopButton");

let progress = 0;
let interval = null;

const startProgress = () => {
  if (progress >= 100) progress = 0; // Reset if complete

  pauseButton.disabled = false;
  stopButton.disabled = false;
  startButton.textContent = "Restart";

  clearInterval(interval);
  interval = setInterval(() => {
    if (progress >= 100) {
      clearInterval(interval);
    } else {
      progress++;
      progressBarFill.style.width = `${progress}%`;
    }
  }, 100);
};

const pauseProgress = () => {
  clearInterval(interval);
};

const stopProgress = () => {
  clearInterval(interval);
  progress = 0;
  progressBarFill.style.width = "0%";

  startButton.textContent = "Start";
  pauseButton.disabled = true;
  stopButton.disabled = true;
};

// Event listeners
startButton.addEventListener("click", startProgress);
pauseButton.addEventListener("click", pauseProgress);
stopButton.addEventListener("click", stopProgress);
