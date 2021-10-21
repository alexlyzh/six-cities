import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import {comments} from './mock/mock';
import {Provider} from 'react-redux';
import {createStore} from '@reduxjs/toolkit';
import {composeWithDevTools} from 'redux-devtools-extension';
import {reducer} from './store/reducers/reducer';

const store = createStore(reducer, composeWithDevTools());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App
        comments={comments}
      />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
