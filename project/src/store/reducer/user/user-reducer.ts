import {AuthorizationStatus} from '../../../constants';
import {ActionCreator} from '../../actions';
import {User} from '../../../types/types';
import {createReducer} from '@reduxjs/toolkit';

type UserState = {
  authorizationStatus: AuthorizationStatus,
  user: User | null,
}

const initialState: UserState = {
  authorizationStatus: AuthorizationStatus.UNKNOWN,
  user: null,
};

const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(ActionCreator.requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(ActionCreator.setUser, (state, action) => {
      state.user = action.payload;
    })
    .addCase(ActionCreator.requireLogout, (state) => {
      state.authorizationStatus = AuthorizationStatus.NO_AUTH;
    });
});

export {userReducer};
export type {UserState};
