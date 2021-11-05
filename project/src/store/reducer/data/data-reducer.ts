import {ActionCreator} from '../../actions';
import {Offer, Review} from '../../../types/types';
import {createReducer} from '@reduxjs/toolkit';

type StatusNames = 'IDLE' | 'PENDING' | 'SUCCESS' | 'ERROR';

type RequestStatus<Type> = {
  requestStatus: StatusNames,
  data: Type[],
}

type RequestStatusByID<Type> = {
  [key: number]: RequestStatus<Type>,
}

type DataState = {
  offers: Offer[],
  favorites: RequestStatus<Offer>,
  nearOffers: RequestStatusByID<Offer>,
  reviews: RequestStatusByID<Review>,
  isDataLoaded: boolean,
}

const initialState: DataState = {
  offers: [],
  favorites: {
    requestStatus: 'IDLE',
    data: [],
  },
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
    .addCase(ActionCreator.clearPersonalData, (state) => {
      state.offers = state.offers.map((offer) => {
        offer.isFavorite = false;
        return offer;
      });
      state.favorites = {
        requestStatus: 'IDLE',
        data: [],
      };
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
    })
    .addCase(ActionCreator.startLoadingFavorites, (state) => {
      state.favorites = {
        requestStatus: 'PENDING',
        data: [],
      };
    })
    .addCase(ActionCreator.loadFavorites, (state, action) => {
      state.favorites = {
        requestStatus: 'SUCCESS',
        data: action.payload,
      };
    })
    .addCase(ActionCreator.setFavoritesLoadingError, (state) => {
      state.favorites = {
        requestStatus: 'ERROR',
        data: [],
      };
    });
});

export {dataReducer};
export type {DataState, RequestStatus, RequestStatusByID, StatusNames};
