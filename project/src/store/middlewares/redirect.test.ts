import {AnyAction} from '@reduxjs/toolkit';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {redirect} from './redirect';
import {State} from '../reducer/root-reducer';
import {ActionCreator} from '../actions';
import {AppRoute} from '../../constants';

const fakeHistory = {
  location: {pathname: ''},
  push(path: string) {
    this.location.pathname = path;
  },
};

jest.mock('../../browser-history.ts', () => fakeHistory);

const mockStore = configureMockStore<State, AnyAction>([redirect]);
const store = mockStore();

describe('Middlewares: redirect', () => {
  beforeEach(() => fakeHistory.push(''));

  it('should be redirect to /login', () => {
    store.dispatch(ActionCreator.redirectToRoute(AppRoute.LOGIN));
    expect(fakeHistory.location.pathname).toBe(AppRoute.LOGIN);
    expect(store.getActions()).toEqual([ActionCreator.redirectToRoute(AppRoute.LOGIN)]);
  });

  it('should not be redirect to /login with unknown actions', () => {
    store.dispatch({
      type: 'UNKNOWN_ACTION',
      payload: AppRoute.ROOT,
    });
    expect(fakeHistory.location.pathname).not.toBe(AppRoute.ROOT);
  });
});
