import {Rating} from './constants';

const getWidthByRating = (rating: number): number => Math.min(rating * Rating.RATING_MULTIPLIER, Rating.MAX_RATING_PERCENT);

export {getWidthByRating};
