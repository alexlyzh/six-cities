import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import {rootReducer} from './store/reducer/root-reducer';
import {createAPI} from './services/api';
import {ActionCreator} from './store/actions';
import {AuthorizationStatus} from './constants';
import {checkAuthAction, fetchOffersAction} from './store/api-actions';
import {redirect} from './store/middlewares/redirect';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const api = createAPI(() => ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH));

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    })
      .concat(redirect),
});

store.dispatch(checkAuthAction());
store.dispatch(fetchOffersAction());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer/>
      <App/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
