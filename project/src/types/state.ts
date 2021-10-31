import {Offer, User, Review} from './offers';
import {AuthorizationStatus} from '../constants';

type RequestStatus<Type> = {
  [key: number]: {
    requestStatus: 'PENDING' | 'SUCCESS' | 'ERROR',
    data: Type[],
  },
}

type State = {
  selectedCity: string,
  offers: Offer[],
  nearOffers: RequestStatus<Offer>,
  reviews: RequestStatus<Review>,
  currentSort: string,
  authorizationStatus: AuthorizationStatus,
  isDataLoaded: boolean,
  user: User | null,
  isSubmitting: boolean,
};

export type {State, RequestStatus};
