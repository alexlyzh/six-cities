import {ActionType} from '../actions';
import browserHistory from '../../browser-history';
import {Middleware} from '@reduxjs/toolkit';
import {reducer} from '../reducer';

type Reducer = ReturnType<typeof reducer>;

const redirect: Middleware<unknown, Reducer> = (_store) => (next) => (action) => {
  if (action.type === ActionType.Redirect) {
    browserHistory.push(action.payload);
  }

  next(action);
};

export {redirect};
