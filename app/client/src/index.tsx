import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { routes } from './config/route';

const render = process.env.NODE_SSR ? 'hydrate' : 'render';

ReactDOM[render](
  <Router>{ renderRoutes(routes) }</Router>,
  document.getElementById('root')
);