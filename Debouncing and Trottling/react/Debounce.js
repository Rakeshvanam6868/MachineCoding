import React, { useState, useEffect } from 'react';

// Debounce function to delay search execution
const debounce = (func, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // Simulate an API call to search items
  const fetchSearchResults = async (searchQuery) => {
    console.log('Searching for:', searchQuery); // For debugging
    // Here you would implement the actual API call
    setSearchResults([`${searchQuery} result 1`, `${searchQuery} result 2`]); // Mock results
  };

  // Debounce the fetchSearchResults function
  const debouncedSearch = debounce((value) => fetchSearchResults(value), 500);

  // Handle input change and trigger debounced search
  const handleChange = (event) => {
    const value = event.target.value;
    setQuery(value);
    debouncedSearch(value);
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
