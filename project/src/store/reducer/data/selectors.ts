import {NameSpace, State} from '../root-reducer';
import {Offer, Review} from '../../../types/types';
import {RequestStatus, RequestStatusByID} from './data-reducer';

const getOffers = (state: State): Offer[] => state[NameSpace.DATA].offers;
const getNearOffers = (state: State): RequestStatusByID<Offer> => state[NameSpace.DATA].nearOffers;
const getReviews = (state: State): RequestStatusByID<Review> => state[NameSpace.DATA].reviews;
const getIsDataLoaded = (state: State): boolean => state[NameSpace.DATA].isDataLoaded;
const getFavorites = (state: State): RequestStatus<Offer> => state[NameSpace.DATA].favorites;

export {getOffers, getNearOffers, getIsDataLoaded, getReviews, getFavorites};
