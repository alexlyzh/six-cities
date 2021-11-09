import {dataReducer, DataState} from './data-reducer';
import {ActionCreator} from '../../actions';
import * as Mock from '../../../utils/mock';
import {FAKE_ARRAY_LENGTH} from '../../../constants';

describe('Reducer: Data', () => {
  const state: DataState = {
    offers: [],
    favorites: {
      requestStatus: 'IDLE',
      data: [],
    },
    nearOffers: {},
    reviews: {},
    isDataLoaded: false,
  };

  it('should load offers and set isDataLoaded "true"',  () => {
    const offers = new Array(FAKE_ARRAY_LENGTH).fill(null).map(Mock.getOffer);
    expect(dataReducer(state, ActionCreator.loadOffers(offers)))
      .toEqual({
        ...state,
        offers,
        isDataLoaded: true,
      });
  });

  it('should return initial state without additional parameters', () => {
    expect(dataReducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual(state);
  });
});

export {};
