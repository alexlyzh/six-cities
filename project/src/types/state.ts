import {Offer} from './offers';

type State = {
  selectedCity: string,
  offers: Offer[],
  currentSort: string,
};

export type {State};
