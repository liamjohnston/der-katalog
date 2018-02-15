import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import options from './options_reducer';

const rootReducer = combineReducers({
  options,
  routing: routerReducer
});

export default rootReducer;
