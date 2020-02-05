import React from 'react';
import { Autocomplete } from '@app/src/library/components/Autocomplete';

export const ViewThree: React.FC = () => {
  const handleChange = (e: React.SyntheticEvent) => {
    console.log('values');
  };

  return(
    <>
      <h1>View Three</h1>
      <Autocomplete 
        suggestions={[
          {
            title: 'Item One',
            id: '1'
          },
          {
            title: 'Item Two',
            id: '2'
          }
        ]}
      />
    </>
  );
};

ViewThree.displayName = 'ViewThree';