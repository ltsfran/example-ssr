import React from 'react';
import ReactDOM from 'react-dom';

const render = process.env.NODE_SSR ? 'hydrate' : 'render';

export const App: React.FC = () => (
  <div>How are you world?</div>
);

App.displayName = 'App';

if (typeof document !== 'undefined') {
  ReactDOM[render](
    <App />,
    document.getElementById('root')
  );
}