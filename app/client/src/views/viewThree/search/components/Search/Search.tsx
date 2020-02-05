import React, { useState } from 'react';
import { Autocomplete } from '@app/src/library/components/Autocomplete';

export const Search = () => {
  const [ items, setItems ] = useState([]);

  const getItemAsync = () => {
    fetch('http://www.json-generator.com/api/json/get/bUEXBynDAO?indent=2')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data[0], 'data');
      })
      .catch((error) => {
      throw new Error(error);
    })
  };

  return(
    <Autocomplete
      items={items}
      onChange={getItemAsync}
      suggestions={[
      {
        title: 'Item One',
        id: '1'
      },
      {
        title: 'Item Two',
        id: '2'
      }
    ]}/>
  );
};