import React from 'react';
import ReactDOM from 'react-dom';
import AppWrap from './components/AppWrap';
import { Provider } from 'react-redux';
import store from './store';
//import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Provider store={store}>
    <AppWrap />
  </Provider>,
  document.getElementById('root')
);
//registerServiceWorker();
