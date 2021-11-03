import {NameSpace, State} from '../root-reducer';
import {Offer, Review} from '../../../types/types';
import {RequestStatus} from './data-reducer';
import { getCurrentSort, getSelectedCity } from '../app/selectors';
import { getOffersInCity, Sort } from '../../../utils';
import { createSelector } from 'reselect';

const getOffers = (state: State): Offer[] => state[NameSpace.DATA].offers;
const getCitySortedOffers = createSelector(getOffers, getSelectedCity, getCurrentSort, (offers, selectedCity, currentSort) => {
  const sortedOffers = Sort[currentSort](offers);
  const offersInCity = getOffersInCity(sortedOffers, selectedCity);

  return offersInCity;
});
const getNearOffers = (state: State): RequestStatus<Offer> => state[NameSpace.DATA].nearOffers;
const getReviews = (state: State): RequestStatus<Review> => state[NameSpace.DATA].reviews;
const getIsDataLoaded = (state: State): boolean => state[NameSpace.DATA].isDataLoaded;

export {getOffers, getCitySortedOffers, getNearOffers, getIsDataLoaded, getReviews};
