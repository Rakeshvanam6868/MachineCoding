const autocompleteInput = document.getElementById("autocomplete-input");
const autocompleteResults = document.getElementById("autocomplete-results");

// Sample data list for typeahead suggestions
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
  "Power Bank",
  "Wireless Earbuds",
  "USB Cable",
  "Screen Protector",
  "Bluetooth Speaker",
  "Phone Case"
];

// Debounce function to limit search execution
function debounce(func, delay) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
}

// Filter suggestions based on the query
function searchSuggestions(query) {
  // Clear previous results
  autocompleteResults.innerHTML = "";

  if (query.trim() === "") return;

  // Filter items for matching suggestions
  const filteredItems = items.filter((item) =>
    item.toLowerCase().includes(query.toLowerCase())
  );

  // Display matching results
  if (filteredItems.length > 0) {
    filteredItems.forEach((item) => {
      const resultElement = document.createElement("p");
      resultElement.textContent = item;
      resultElement.addEventListener("click", () => {
        autocompleteInput.value = item;
        autocompleteResults.innerHTML = ""; // Clear suggestions
      });
      autocompleteResults.appendChild(resultElement);
    });
  } else {
    autocompleteResults.innerHTML = "<p>No results found</p>";
  }
}

// Debounce the searchSuggestions function
const debouncedSearch = debounce((event) => searchSuggestions(event.target.value), 300);

autocompleteInput.addEventListener("input", debouncedSearch);
