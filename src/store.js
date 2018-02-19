import { createStore } from 'redux';

import rootReducer from './reducers/index';

//TODO: do this in a non-duplicated way - see store.js :/
const defautState = {
  options: {
    viewMode: 'grid',
    query: '',
    sortBy: {
      sortBy: 'artist',
      ascDesc: 'asc'
    },
    filter: 'all'
  }
};

const store = createStore(
  rootReducer,
  defautState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
