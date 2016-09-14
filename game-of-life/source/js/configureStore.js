import { createStore } from 'redux';
import game from './reducers';
import { newGame, reproduce } from './actions';

const configureStore = () => {
  const store = createStore(
    game, 
    window.devToolsExtension && window.devToolsExtension()
  );
  store.dispatch(newGame());

  store.timer = setInterval(() => {
    if (store.getState().playing) {
      store.dispatch(reproduce())
    }
  }, 50);

  return store;
};

export default configureStore;
