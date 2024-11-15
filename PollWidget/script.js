let votes = {
    JavaScript: 0,
    Python: 0,
    Java: 0,
    Cplusplus: 0,
  };
  
  function vote(option) {
    votes[option]++;
    displayResults();
  }
  
  function displayResults() {
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "<h3>Results:</h3>";
    for (let option in votes) {
      const percentage = ((votes[option] / totalVotes()) * 100).toFixed(1);
      resultsDiv.innerHTML += `<p>${option}: ${votes[option]} votes (${percentage}%)</p>`;
    }
  }
  
  function totalVotes() {
    return Object.values(votes).reduce((sum, value) => sum + value, 0);
  }
  