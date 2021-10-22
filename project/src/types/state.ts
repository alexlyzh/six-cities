import {Offer} from './offers';

type State = {
  selectedCity: string,
  offers: Offer[],
  currentSort: string,
  highlightedOffer?: Offer | undefined,
};

export type {State};
