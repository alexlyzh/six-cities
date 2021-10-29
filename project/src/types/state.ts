import {Offer, User, Review} from './offers';
import {AuthorizationStatus} from '../constants';

type ContentByID<Type> = {
  id: number | null,
  data: Type[],
}

type State = {
  selectedCity: string,
  offers: Offer[],
  nearOffers: ContentByID<Offer>,
  reviews: ContentByID<Review>,
  currentSort: string,
  authorizationStatus: AuthorizationStatus,
  isDataLoaded: boolean,
  user: User | null,
  isSubmitting: boolean,
};

export type {State, ContentByID};
