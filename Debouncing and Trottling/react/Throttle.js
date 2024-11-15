import React, { useState, useRef } from 'react';

// Throttle function to control the frequency of search execution
const throttle = (func, limit) => {
  let lastFunc;
  let lastRan;
  return function (...args) {
    if (!lastRan) {
      func(...args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(() => {
        if (Date.now() - lastRan >= limit) {
          func(...args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
};

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  
  // Simulate an API call to search items
  const fetchSearchResults = async (searchQuery) => {
    console.log('Searching for:', searchQuery);
    // Here you would implement the actual API call
    setSearchResults([`${searchQuery} result 1`, `${searchQuery} result 2`]);
  };

  // Throttle the fetchSearchResults function
  const throttledSearch = useRef(throttle((value) => fetchSearchResults(value), 1000)).current;

  // Handle input change and trigger throttled search
  const handleChange = (event) => {
    const value = event.target.value;
    setQuery(value);
    throttledSearch(value);
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search for products..."
        style={{ padding: '10px', width: '300px' }}
      />
      <div>
        {searchResults.map((result, index) => (
          <p key={index}>{result}</p>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
