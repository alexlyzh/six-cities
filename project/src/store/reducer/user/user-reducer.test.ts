import {initialState, userReducer} from './user-reducer';
import {ActionCreator, ActionType} from '../../actions';
import {AuthorizationStatus} from '../../../constants';
import {makeFakeUser} from '../../../utils/mock';

describe('Reducer: User', () => {
  it('should return initial state without additional parameters', () => {
    expect(userReducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual({...initialState, authorizationStatus: AuthorizationStatus.UNKNOWN});
  });

  it('should update authorization to "AUTH"', () => {
    const requiredAuth = {
      type: ActionType.RequireAuthorization,
      payload: AuthorizationStatus.AUTH,
    };

    expect(userReducer(initialState, requiredAuth))
      .toEqual({...initialState, authorizationStatus: AuthorizationStatus.AUTH});
  });

  it('should update authorization to "NO_AUTH"', () => {
    expect(userReducer(initialState, ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH)))
      .toEqual({...initialState, authorizationStatus: AuthorizationStatus.NO_AUTH});
  });

    it('should update authorization to "NO_AUTH"', () => {
      expect(userReducer(initialState, ActionCreator.requireLogout()))
        .toEqual({
          user: null,
          authorizationStatus: AuthorizationStatus.NO_AUTH
        });
    });

    it('should set user to state', () => {
    const user = makeFakeUser();
    expect(userReducer(initialState, ActionCreator.setUser(user)))
      .toEqual({...initialState, user});
  });
});
