import {AuthorizationStatus} from '../../../constants';
import {Actions, ActionType} from '../../actions';
import {User} from '../../../types/types';

type UserState = {
  authorizationStatus: AuthorizationStatus,
  user: User | null,
}

const initialUserState = {
  authorizationStatus: AuthorizationStatus.UNKNOWN,
  user: null,
};

const userReducer = (state: UserState = initialUserState, action: Actions): UserState => {
  switch (action.type) {
    case ActionType.RequireAuthorization:
      return {...state, authorizationStatus: action.payload};
    case ActionType.LoginUser:
      return {...state, user: action.payload};
    case ActionType.RequireLogout:
      return {...state, authorizationStatus: AuthorizationStatus.NO_AUTH};
    default:
      return state;
  }
};

export {userReducer};
export type {UserState};
