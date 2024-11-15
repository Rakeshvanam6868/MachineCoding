import React, { useState } from "react";
import "./App.css";

const options = ["JavaScript", "Python", "Java", "C++"];

const App = () => {
  const [votes, setVotes] = useState({
    JavaScript: 0,
    Python: 0,
    Java: 0,
    Cplusplus: 0,
  });

  const handleVote = (option) => {
    setVotes((prevVotes) => ({
      ...prevVotes,
      [option]: prevVotes[option] + 1,
    }));
  };

  const totalVotes = () => Object.values(votes).reduce((sum, value) => sum + value, 0);

  return (
    <div className="poll-widget">
      <h2>What's your favorite programming language?</h2>
      <div className="options">
        {options.map((option) => (
          <button key={option} onClick={() => handleVote(option)}>
            {option}
          </button>
        ))}
      </div>
      <div className="results">
        <h3>Results:</h3>
        {options.map((option) => {
          const percentage = ((votes[option] / totalVotes()) * 100).toFixed(1);
          return (
            <p key={option}>
              {option}: {votes[option]} votes ({isNaN(percentage) ? 0 : percentage}%)
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default App;
