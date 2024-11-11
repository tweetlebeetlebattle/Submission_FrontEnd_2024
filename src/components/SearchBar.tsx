import React, { useState, useRef, useEffect } from 'react';

const SearchBar = () => {
  const [query, setQuery] = useState<string | null>(null);
  const [areSuggestionsVisible, setAreSuggestionsVisible] = useState(false);
  const [suggestions, setSuggestions] = useState<string[] | null>(null);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleQueryChange = (input: string) => {
    setQuery(input);
    setAreSuggestionsVisible(true);
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    debounceTimeout.current = setTimeout(() => {
      handleSearch(input);
    }, 500); // Debounce time is 500 ms
  };

  const handleSearch = (query: string) => {
    console.log(query);
    // Logging the query for debugging
    // Here I set suggestions to backend response
    // Simulating fetching data
    setSuggestions(
      ['Suggestion 1', 'Suggestion 2', 'Suggestion 3'].filter(item =>
        item.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  const handleSuggestionClick = (suggestionName: string) => {
    console.log(`Redirect to page with: ${suggestionName}`);
    // Here you can add redirection logic or other functionality
  };

  useEffect(() => {
    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <input
        type='text'
        value={query || ''}
        onChange={e => handleQueryChange(e.target.value)}
        placeholder='Search blogs...'
        style={{ marginRight: '10px', padding: '10px', width: '300px' }}
      />
      {areSuggestionsVisible && suggestions && suggestions.length > 0 && (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              style={{ cursor: 'pointer', padding: '10px' }}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
