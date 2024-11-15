import React, { useState, useEffect } from "react";
import "./AutoCompleteSearchBar.css";

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
  "Phone Case",
];

// Debounce function to delay search execution
const debounce = (func, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
};

const AutoCompleteSearchBar = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  // Function to handle search suggestions
  const handleSearch = (input) => {
    if (input.trim() === "") {
      setSuggestions([]);
      return;
    }

    const filteredItems = items.filter((item) =>
      item.toLowerCase().includes(input.toLowerCase())
    );

    setSuggestions(filteredItems.length ? filteredItems : ["No results found"]);
  };

  // Debounced version of handleSearch
  const debouncedSearch = debounce(handleSearch, 300);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value);
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    setSuggestions([]); // Clear suggestions after selection
  };

  return (
    <div className="autocomplete-container">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search for products..."
        className="autocomplete-input"
      />
      {suggestions.length > 0 && (
        <div className="autocomplete-results">
          {suggestions.map((suggestion, index) => (
            <p
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="autocomplete-item"
            >
              {suggestion}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default AutoCompleteSearchBar;
