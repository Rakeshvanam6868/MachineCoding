import React, { useState, useRef } from "react";
import "./App.css";

const ProgressBar = () => {
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  const startProgress = () => {
    clearInterval(timerRef.current); // Clear any existing intervals
    setIsPaused(false);
    timerRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timerRef.current);
          return 100;
        }
        return prev + 1;
      });
    }, 100); // Increment every 100ms
  };

  const pauseProgress = () => {
    clearInterval(timerRef.current);
    setIsPaused(true);
  };

  const stopProgress = () => {
    clearInterval(timerRef.current);
    setProgress(0);
    setIsPaused(false);
  };

  return (
    <div className="progress-bar-container">
      <div className="progress-bar">
        <div
          className="progress-bar-fill"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className="controls">
        <button onClick={startProgress}>
          {progress === 100 ? "Restart" : "Start"}
        </button>
        <button onClick={pauseProgress} disabled={progress === 0 || progress === 100}>
          Pause
        </button>
        <button onClick={stopProgress} disabled={progress === 0}>
          Stop
        </button>
      </div>
    </div>
  );
};

export default ProgressBar;
