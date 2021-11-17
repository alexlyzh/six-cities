import {dataReducer, initialState} from './data-reducer';
import {ActionCreator} from '../../actions';
import * as Mock from '../../../utils/mock';
import {FAKE_ARRAY_LENGTH, FAKE_ID} from '../../../constants';

describe('Reducer: Data', () => {
  const state = initialState;

  it('should return initial state without additional parameters', () => {
    expect(dataReducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual(state);
  });

  it('should load offers and set isDataLoaded "true"',  () => {
    const offers = new Array(FAKE_ARRAY_LENGTH).fill(null).map(Mock.getOffer);
    expect(dataReducer(state, ActionCreator.loadOffers(offers)))
      .toEqual({
        ...state,
        offers,
        isDataLoaded: true,
      });
  });

  it('should set all offers isFavorite to "false" and reset state.favorites', () => {
    expect(dataReducer(state, ActionCreator.clearPersonalData()))
      .toEqual({
        ...state,
        offers: state.offers.map((offer) => {
          offer.isFavorite = false;
          return offer;
        }),
      });
  });

  describe('Reviews loading', () => {
    it('should set requestStatus "PENDING" with no data for review-component[id]', () => {
      expect(dataReducer(state, ActionCreator.startLoadingReviews(FAKE_ID)))
        .toEqual({
          ...state,
          reviews: {
            [FAKE_ID]: {
              requestStatus: 'PENDING',
              data: [],
            },
          },
        });
    });

    it('should set requestStatus "ERROR" with no data for review-component[id]', () => {
      expect(dataReducer(state, ActionCreator.setReviewsLoadingError(FAKE_ID)))
        .toEqual({
          ...state,
          reviews: {
            [FAKE_ID]: {
              requestStatus: 'ERROR',
              data: [],
            },
          },
        });
    });

    it('should set requestStatus "SUCCESS" and save reviews data for review-component[id]', () => {
      const reviews = new Array(FAKE_ARRAY_LENGTH).fill(null).map(Mock.getReview);
      expect(dataReducer(state, ActionCreator.loadReviews(FAKE_ID, reviews)))
        .toEqual({
          ...state,
          reviews: {
            [FAKE_ID]: {
              requestStatus: 'SUCCESS',
              data: reviews,
            },
          },
        });
    });
  });

  describe('Near offers loading', () => {
    it('should set requestStatus "PENDING" with no data for nearOffers[id]', () => {
      expect(dataReducer(state, ActionCreator.startLoadingNearOffers(FAKE_ID)))
        .toEqual({
          ...state,
          nearOffers: {
            [FAKE_ID]: {
              requestStatus: 'PENDING',
              data: [],
            },
          },
        });
    });

    it('should set requestStatus "ERROR" with no data for nearOffers[id]', () => {
      expect(dataReducer(state, ActionCreator.setNearOffersLoadingError(FAKE_ID)))
        .toEqual({
          ...state,
          nearOffers: {
            [FAKE_ID]: {
              requestStatus: 'ERROR',
              data: [],
            },
          },
        });
    });

    it('should set requestStatus "SUCCESS" and save near offers data for nearOffers[id]', () => {
      const offers = new Array(FAKE_ARRAY_LENGTH).fill(null).map(Mock.getOffer);
      expect(dataReducer(state, ActionCreator.loadNearOffers(FAKE_ID, offers)))
        .toEqual({
          ...state,
          nearOffers: {
            [FAKE_ID]: {
              requestStatus: 'SUCCESS',
              data: offers,
            },
          },
        });
    });
  });

  describe('Favorites loading', () => {
    it('should set requestStatus "PENDING" with no data', () => {
      expect(dataReducer(state, ActionCreator.startLoadingFavorites()))
        .toEqual({
          ...state,
          favorites: {
            requestStatus: 'PENDING',
            data: [],
          },
        });
    });

    it('should set requestStatus "ERROR" with no data', () => {
      expect(dataReducer(state, ActionCreator.setFavoritesLoadingError()))
        .toEqual({
          ...state,
          favorites: {
            requestStatus: 'ERROR',
            data: [],
          },
        });
    });

    it('should set requestStatus "SUCCESS" and save favorites data', () => {
      const offers = new Array(FAKE_ARRAY_LENGTH).fill(null).map(Mock.getOffer);
      expect(dataReducer(state, ActionCreator.loadFavorites(offers)))
        .toEqual({
          ...state,
          favorites: {
            requestStatus: 'SUCCESS',
            data: offers,
          },
        });
    });
  });
});
