import React, { useState, useEffect } from 'react';

const Counter = () => {
  const [ count, setCount ] = useState(0);

  useEffect(() => {
    document.title = 'Count' + count;
    return() => {
      document.title = 'Count' + count;
    };
  });

  const handleClick = () => {
    setCount(count + 1);
    console.log('hola mundo');
  };

  useEffect(() => {
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
  }, []);

  return(
    <button onClick={handleClick}>Click</button>
  );
};

export const ViewOne: React.FC = () => (
  <>
    <h1>View One</h1>
    <div>How are you world?</div>
    <Counter />
  </>
);

ViewOne.displayName = 'ViewOne';