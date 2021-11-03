import {ActionType} from '../actions';
import browserHistory from '../../browser-history';
import {Middleware} from '@reduxjs/toolkit';
import {State} from '../reducer/root-reducer';

const redirect: Middleware<unknown, State> = (_store) => (next) => (action) => {
  if (action.type === ActionType.Redirect) {
    browserHistory.push(action.payload);
  }

  return next(action);
};

export {redirect};
