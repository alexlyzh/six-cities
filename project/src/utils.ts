import {Rating, SortType} from './constants';
import {Offer} from './types/offers';

const getWidthByRating = (rating: number): number => Math.min(rating * Rating.RATING_MULTIPLIER, Rating.MAX_RATING_PERCENT);

const Sort = {
  [SortType.POPULAR]: (offers: Offer[]): Offer[] => offers.slice(),
  [SortType.PRICE_DESCENDING]: (offers: Offer[]): Offer[] => offers.slice().sort((a, b) => b.price - a.price),
  [SortType.PRICE_ASCENDING]: (offers: Offer[]): Offer[] => offers.slice().sort((a, b) => a.price - b.price),
  [SortType.TOP_RATED]: (offers: Offer[]): Offer[] => offers.slice().sort((a, b) => b.rating - a.rating),
};

export {getWidthByRating, Sort};
