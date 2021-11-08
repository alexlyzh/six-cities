import {CityGeoData, Rating, SortType} from './constants';
import {Offer} from './types/types';
import dayjs from 'dayjs';

const getWidthByRating = (rating: number): number => Math.min(rating * Rating.RATING_MULTIPLIER, Rating.MAX_RATING_PERCENT);

const Sort = {
  [SortType.POPULAR]: (offers: Offer[]): Offer[] => offers.slice(),
  [SortType.PRICE_DESCENDING]: (offers: Offer[]): Offer[] => offers.slice().sort((a, b) => b.price - a.price),
  [SortType.PRICE_ASCENDING]: (offers: Offer[]): Offer[] => offers.slice().sort((a, b) => a.price - b.price),
  [SortType.TOP_RATED]: (offers: Offer[]): Offer[] => offers.slice().sort((a, b) => b.rating - a.rating),
};

const getOffersInCity = (offers: Offer[], cityName: string): Offer[] => offers.filter((offer) => offer.city.name === cityName);

const getRandomInteger = (min = 0, max = 1): number => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomCityName = (): string => {
  const cities = Object.keys(CityGeoData);
  const randomInteger = getRandomInteger(0, cities.length - 1);
  return  cities[randomInteger];
};

const formatToDatetime = (date: string):string => dayjs(date).format('YYYY-MM-DD');
const formatToFullMonthYear = (date: string):string => dayjs(date).format('MMMM YYYY');

export {getWidthByRating, Sort, getOffersInCity, getRandomInteger, getRandomCityName, formatToDatetime, formatToFullMonthYear};
