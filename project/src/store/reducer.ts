import {State} from '../types/state';
import {AuthorizationStatus, INITIAL_CITY_NAME, SortType} from '../constants';
import {Actions, ActionType} from './actions';
import Adapter from '../services/adapter';

const initialState: State = {
  selectedCity: INITIAL_CITY_NAME,
  offers: [],
  currentSort: SortType.POPULAR,
  authorizationStatus: AuthorizationStatus.UNKNOWN,
  isDataLoaded: false,
  user: null,
};

const reducer = (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case ActionType.ChangeCity:
      return {...state, selectedCity: action.payload};
    case ActionType.LoadOffers:
      return {
        ...state,
        offers: action.payload,
        isDataLoaded: true,
      };
    case ActionType.ChangeSort:
      return {...state, currentSort: action.payload};
    case ActionType.RequireAuthorization:
      return {...state, authorizationStatus: action.payload};
    case ActionType.LoginUser:
      return {...state, user: !action.payload ? null : (Adapter.userToClient(action.payload))};
    case ActionType.RequireLogout:
      return {...state, authorizationStatus: AuthorizationStatus.NO_AUTH};
    default:
      return state;
  }
};

export {reducer};
