import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiTerminal from '../client/apiTerminal';

interface SearchBarProps {
  handleSuggestionClick: (suggestionName: string) => void;
}

const SearchBar = ({ handleSuggestionClick }: SearchBarProps) => {
  const [query, setQuery] = useState<string | null>(null);
  const [areSuggestionsVisible, setAreSuggestionsVisible] = useState(false);
  const [suggestions, setSuggestions] = useState<string[] | null>(null);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();

  const handleQueryChange = (input: string) => {
    const trimmedInput = input.trim();

    if (!trimmedInput) {
      setQuery(null);
      setSuggestions([]);
      setAreSuggestionsVisible(false);
      return;
    }

    setQuery(input);
    setAreSuggestionsVisible(true);
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    debounceTimeout.current = setTimeout(() => {
      handleSearch(input);
    }, 500);
  };

  const handleSearch = async (query: string) => {
    const resposne = await apiTerminal.FetchSearchSuggestions(
      query.trim(),
      navigate
    );

    setSuggestions(resposne.data);
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
