import React, { useState, useEffect } from 'react';

interface Props {
  items?: any;
  onChange?: Function;
  suggestions: any;
  getItemAsync?: Function;
}

export const Autocomplete: React.FC<Props> = ({ items, onChange, suggestions = [], getItemAsync }) => {
  const [ filteredSuggestions, setFilteredSuggestions ] = useState(suggestions);
  const [ userInput, setUserInput ] = useState('');

  const handleChange = (e) => {
    const value = e.currentTarget.value;
    const filteredSuggestions = suggestions.filter(
      suggestion => 
        suggestion.title.toLowerCase().indexOf(value.toLowerCase()) > -1
    );
    setFilteredSuggestions(filteredSuggestions);
    setUserInput(value);
    onChange && onChange(e);
  };

  const handleClickItem = () => {

  };

  return(
    <>
      <input 
        type="text"
        onChange={handleChange}
        value={userInput}
      />
      <div>
        <ul>
          {filteredSuggestions.map((item, index) => (
            <li key={index} data-id={item.id} onClick={handleClickItem}>{item.title}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

Autocomplete.displayName = 'Autocomplete';