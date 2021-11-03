import {ActionCreator} from '../../actions';
import {Offer, Review} from '../../../types/types';
import {createReducer} from '@reduxjs/toolkit';

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

const initialState: DataState = {
  offers: [],
  nearOffers: {},
  reviews: {},
  isDataLoaded: false,
};

const dataReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(ActionCreator.loadOffers, (state, action) => {
      state.offers = action.payload;
      state.isDataLoaded = true;
    })
    .addCase(ActionCreator.startLoadingReviews, (state, action) => {
      state.reviews[action.payload] = {
        requestStatus: 'PENDING',
        data: [],
      };
    })
    .addCase(ActionCreator.loadReviews, (state, action) => {
      state.reviews[action.payload.offerId] = {
        requestStatus: 'SUCCESS',
        data: action.payload.reviews,
      };
    })
    .addCase(ActionCreator.setReviewsLoadingError, (state, action) => {
      state.reviews[action.payload] = {
        requestStatus: 'ERROR',
        data: [],
      };
    })
    .addCase(ActionCreator.startLoadingNearOffers, (state, action) => {
      state.nearOffers[action.payload] = {
        requestStatus: 'PENDING',
        data: [],
      };
    })
    .addCase(ActionCreator.loadNearOffers, (state, action) => {
      state.nearOffers[action.payload.offerId] = {
        requestStatus: 'SUCCESS',
        data: action.payload.offers,
      };
    })
    .addCase(ActionCreator.setNearOffersLoadingError, (state, action) => {
      state.reviews[action.payload] = {
        requestStatus: 'ERROR',
        data: [],
      };
    });
});

export {dataReducer};
export type {DataState, RequestStatus};
