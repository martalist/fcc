import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import game from './reducers';
import { newGame, reproduce } from './actions';
import App from './components/App';

// Stylesheets
import '../sass/style.scss';

const store = createStore(game)
store.dispatch(newGame());

// Render the application
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

