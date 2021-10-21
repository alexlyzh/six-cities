import {Offer} from './offers';

type State = {
  selectedCity: string,
  offers: Offer[],
  highlightedOffer?: Offer | undefined,
};

export type {State};
