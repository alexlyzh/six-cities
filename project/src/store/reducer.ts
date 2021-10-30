import {State} from '../types/state';
import {AuthorizationStatus, INITIAL_CITY_NAME, SortType} from '../constants';
import {Actions, ActionType} from './actions';
import Adapter from '../services/adapter';

const initialState: State = {
  selectedCity: INITIAL_CITY_NAME,
  offers: [],
  nearOffers: {
    id: null,
    data: [],
  },
  reviews: {},
  currentSort: SortType.POPULAR,
  authorizationStatus: AuthorizationStatus.UNKNOWN,
  isDataLoaded: false,
  user: null,
  isSubmitting: false,
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
    case ActionType.StartLoadingReviews:
      return {
        ...state,
        reviews: {
          ...state.reviews,
          [action.payload]: {
            requestStatus: 'PENDING',
            data: [],
          },
        },
      };
    case ActionType.LoadReviews:
      return {
        ...state,
        reviews: {
          ...state.reviews,
          [action.payload.offerId]: {
            requestStatus: 'SUCCESS',
            data: action.payload.reviews,
          },
        },
      };
    case ActionType.LoadReviewsError:
      return {
        ...state,
        reviews: {
          ...state.reviews,
          [action.payload]: {
            requestStatus: 'ERROR',
            data: [],
          },
        },
      };
    case ActionType.LoadNearOffers:
      return {...state, nearOffers: action.payload};
    case ActionType.SetSubmittingState:
      return {...state, isSubmitting: action.payload};
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
