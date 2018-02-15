import { createStore } from 'redux';

import rootReducer from './reducers/index';

const defautState = {
  options: {
    viewMode: 'grid',
    query: '',
    sortBy: 'artist',
    filter: 'all'
  }
};

const store = createStore(rootReducer, defautState);

export default store;
