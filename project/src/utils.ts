import {Rating} from './constants';

const getWidthStyle = (rating: number): number => Math.min(rating * Rating.RATING_MULTIPLIER, Rating.MAX_RATING_PERCENT);

const capitalize = (string: string): string => string.charAt(0).toUpperCase() + string.slice(1);

export {getWidthStyle, capitalize};
