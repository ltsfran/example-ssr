import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

if (process.env.NODE_SSR) { global.window = {}; }

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({}),
    (window as any).__PRELOADED_STATE__,
    composeEnhancers(applyMiddleware(thunk))
  );
  return store;
};