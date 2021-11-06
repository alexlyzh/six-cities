import {NameSpace, State} from '../root-reducer';
import {Offer, Review} from '../../../types/types';
import {RequestStatus, RequestStatusByID} from './data-reducer';
import {getCurrentSort, getSelectedCity} from '../app/selectors';
import {getOffersInCity, Sort} from '../../../utils';
import {createSelector} from '@reduxjs/toolkit';

const getOffers = (state: State): Offer[] => state[NameSpace.DATA].offers;
const getNearOffers = (state: State): RequestStatusByID<Offer> => state[NameSpace.DATA].nearOffers;
const getReviews = (state: State): RequestStatusByID<Review> => state[NameSpace.DATA].reviews;
const getIsDataLoaded = (state: State): boolean => state[NameSpace.DATA].isDataLoaded;
const getFavorites = (state: State): RequestStatus<Offer> => state[NameSpace.DATA].favorites;

const getCitySortedOffers = createSelector([getOffers, getSelectedCity, getCurrentSort], (offers, selectedCity, currentSort) => {
  const sortedOffers = Sort[currentSort](offers);
  return getOffersInCity(sortedOffers, selectedCity);
});

export {getOffers, getNearOffers, getIsDataLoaded, getReviews, getFavorites, getCitySortedOffers};
