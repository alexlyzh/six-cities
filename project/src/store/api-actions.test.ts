import {Action, AnyAction} from '@reduxjs/toolkit';
import {configureMockStore} from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {createAPI} from '../services/api';
import {State} from './reducer/root-reducer';
import {APIRoute, AuthorizationStatus} from '../constants';
import {ActionsAPI} from './api-actions';
import {ActionCreator} from './actions';
import {makeFakeUserBackend} from '../utils/mock';
import Adapter from '../services/adapter';

const onFakeUnauthorized = jest.fn();
const api = createAPI(onFakeUnauthorized);
const mockApi = new MockAdapter(api);

const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<State, AnyAction, ThunkDispatch<State, typeof api, Action>>(middlewares);
const store = mockStore();

describe('Async actions', () => {
  it('should set authorization to "AUTH" when server responds with 200 status', async () => {
    const user = makeFakeUserBackend();
    mockApi.onGet(APIRoute.Login).reply(200, user);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(ActionsAPI.checkAuth());

    expect(store.getActions()).toEqual([
      ActionCreator.setUser(Adapter.userToClient(user)),
      ActionCreator.requireAuthorization(AuthorizationStatus.AUTH),
    ]);
  });
});
