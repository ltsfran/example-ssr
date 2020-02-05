import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { routes } from './config/route';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

const store = configureStore();
const render = process.env.NODE_SSR ? 'hydrate' : 'render';

ReactDOM[render](
  <Provider store={store}>
    <Router>
      {renderRoutes(routes)}
    </Router>
  </Provider>,
  document.getElementById('root')
);