import { createStore } from 'redux';
import game from './reducers';
import { newGame, reproduce } from './actions';

const configureStore = () => {
  const store = createStore(
    game, 
    window.devToolsExtension && window.devToolsExtension()
  );
  store.dispatch(newGame());

  return store;
};

export default configureStore;
