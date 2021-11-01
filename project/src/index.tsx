import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from '@reduxjs/toolkit';
import {composeWithDevTools} from 'redux-devtools-extension';
import {rootReducer} from './store/reducer/root-reducer';
import {createAPI} from './services/api';
import {ActionCreator} from './store/actions';
import {AuthorizationStatus} from './constants';
import thunk from 'redux-thunk';
import {checkAuthAction, fetchOffersAction} from './store/api-actions';
import {ThunkAppDispatch} from './store/actions';
import {redirect} from './store/middlewares/redirect';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const api = createAPI(() => ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH));

const middlewares = [
  thunk.withExtraArgument(api),
  redirect,
];

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middlewares)));

(store.dispatch as ThunkAppDispatch)(checkAuthAction());
(store.dispatch as ThunkAppDispatch)(fetchOffersAction());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer/>
      <App/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
