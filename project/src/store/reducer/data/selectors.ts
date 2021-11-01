import {NameSpace, State} from '../root-reducer';
import {Offer, Review} from '../../../types/types';
import {RequestStatus} from './data-reducer';

const getOffers = (state: State): Offer[] => state[NameSpace.DATA].offers;
const getNearOffers = (state: State): RequestStatus<Offer> => state[NameSpace.DATA].nearOffers;
const getReviews = (state: State): RequestStatus<Review> => state[NameSpace.DATA].reviews;
const getIsDataLoaded = (state: State): boolean => state[NameSpace.DATA].isDataLoaded;

export {getOffers, getNearOffers, getIsDataLoaded, getReviews};
