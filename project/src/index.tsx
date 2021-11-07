import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import {rootReducer} from './store/reducer/root-reducer';
import {createAPI} from './services/api';
import {ActionCreator} from './store/actions';
import {AuthorizationStatus, ErrorMessage} from './constants';
import {ActionsAPI} from './store/api-actions';
import {redirect} from './store/middlewares/redirect';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const api = createAPI(() => {
  ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH);
  toast.info(ErrorMessage.NoAuthorization);
});

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

store.dispatch(ActionsAPI.checkAuth());
store.dispatch(ActionsAPI.getOffers());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer/>
      <App/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
