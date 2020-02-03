import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

const render = process.env.NODE_SSR ? 'hydrate' : 'render';

console.log(process.env.PATH_STATIC, 'PATH_STATIC');

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

  return(
    <button onClick={handleClick}>Click</button>
  );
};

export const App: React.FC = () => (
  <>
    <div>How are you world?</div>
    <Counter />
  </>
);

App.displayName = 'App';

if (typeof document !== 'undefined') {
  ReactDOM[render](
    <App />,
    document.getElementById('root')
  );
}