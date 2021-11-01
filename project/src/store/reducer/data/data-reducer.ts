import {Actions, ActionType} from '../../actions';
import {Offer, Review} from '../../../types/types';

type RequestStatus<Type> = {
  [key: number]: {
    requestStatus: 'PENDING' | 'SUCCESS' | 'ERROR',
    data: Type[],
  },
}

type DataState = {
  offers: Offer[],
  nearOffers: RequestStatus<Offer>,
  reviews: RequestStatus<Review>,
  isDataLoaded: boolean,
}

const initialDataState = {
  offers: [],
  nearOffers: {},
  reviews: {},
  isDataLoaded: false,
};

const dataReducer = (state: DataState = initialDataState, action: Actions): DataState => {
  switch (action.type) {
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
    case ActionType.ErrorLoadingReviews:
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
    case ActionType.StartLoadingNearOffers:
      return {
        ...state,
        nearOffers: {
          ...state.nearOffers,
          [action.payload]: {
            requestStatus: 'PENDING',
            data: [],
          },
        },
      };
    case ActionType.LoadNearOffers:
      return {
        ...state,
        nearOffers: {
          ...state.nearOffers,
          [action.payload.offerId]: {
            requestStatus: 'SUCCESS',
            data: action.payload.offers,
          },
        },
      };
    case ActionType.ErrorLoadingNearOffers:
      return {
        ...state,
        nearOffers: {
          ...state.nearOffers,
          [action.payload]: {
            requestStatus: 'ERROR',
            data: [],
          },
        },
      };
    default:
      return state;
  }
};

export {dataReducer};
export type {DataState, RequestStatus};
