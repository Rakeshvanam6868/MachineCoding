const searchInput = document.getElementById("search-input");
const searchResults = document.getElementById("search-results");

// Simulated API data
const items = [
  "Mobile Phone",
  "Laptop",
  "Headphones",
  "Smart Watch",
  "Tablet",
  "Keyboard",
  "Mouse",
  "Monitor",
  "Charger",
  "Power Bank"
];

// Debounce function
function debounce(func, delay) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
}

// Search function
function search(query) {
  // Clear previous results
  searchResults.innerHTML = "";

  if (query.trim() === "") return;

  // Filter results based on query
  const filteredItems = items.filter((item) =>
    item.toLowerCase().includes(query.toLowerCase())
  );

  // Display results
  if (filteredItems.length > 0) {
    filteredItems.forEach((item) => {
      const resultElement = document.createElement("p");
      resultElement.textContent = item;
      searchResults.appendChild(resultElement);
    });
  } else {
    searchResults.innerHTML = "<p>No results found</p>";
  }
}

// Attach debounced search to input
const debouncedSearch = debounce((event) => search(event.target.value), 500);

searchInput.addEventListener("input", debouncedSearch);
