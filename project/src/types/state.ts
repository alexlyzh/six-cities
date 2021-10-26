import {Offer, User} from './offers';
import {AuthorizationStatus} from '../constants';

type State = {
  selectedCity: string,
  offers: Offer[],
  currentSort: string,
  authorizationStatus: AuthorizationStatus,
  isDataLoaded: boolean,
  user: User | null,
};

export type {State};
