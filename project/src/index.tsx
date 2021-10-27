import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import {comments} from './mock/mock';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from '@reduxjs/toolkit';
import {composeWithDevTools} from 'redux-devtools-extension';
import {reducer} from './store/reducer';
import {createAPI} from './services/api';
import {requireAuthorization} from './store/actions';
import {AuthorizationStatus} from './constants';
import thunk from 'redux-thunk';
import {checkAuthAction, fetchOffersAction} from './store/api-actions';
import {ThunkAppDispatch} from './store/actions';
import {redirect} from './store/middlewares/redirect';

const api = createAPI(() => requireAuthorization(AuthorizationStatus.NO_AUTH));

const store = createStore(reducer, composeWithDevTools(
  applyMiddleware(thunk.withExtraArgument(api)),
  applyMiddleware(redirect),
));

(store.dispatch as ThunkAppDispatch)(checkAuthAction());
(store.dispatch as ThunkAppDispatch)(fetchOffersAction());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App
        comments={comments}
      />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
