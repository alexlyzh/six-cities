import {Offer} from './offers';
import {AuthorizationStatus} from '../constants';

type State = {
  selectedCity: string,
  offers: Offer[],
  currentSort: string,
  authorizationStatus: AuthorizationStatus,
  isDataLoaded: boolean,
};

export type {State};
