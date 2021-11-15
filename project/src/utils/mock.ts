import {internet, datatype, image, address} from 'faker';
import {City, Location, Offer, OfferBackend, Review, ReviewBackend, User, UserBackend} from '../types/types';
import {getRandomInteger} from './utils';
import {FAKE_ARRAY_LENGTH, OfferType} from '../constants';

const getUser = (): User => ({
  avatarUrl: internet.avatar(),
  id: datatype.number(),
  isPro: datatype.boolean(),
  name: internet.userName(),
  email: internet.email(),
  token: datatype.string(),
});

const getUserBackend = (): UserBackend => ({
  'avatar_url': internet.avatar(),
  id: datatype.number(),
  'is_pro': datatype.boolean(),
  name: internet.userName(),
  email: internet.email(),
  token: datatype.string(),
});

const getLocation = (): Location => ({
  latitude: Number(address.latitude()),
  longitude: Number(address.longitude()),
  zoom: 10,
});

const getCity = (): City => ({
  location: getLocation(),
  name: address.city(),
});

const getRandomOfferTypeKey = (): string => {
  const typeKeys = Object.keys(OfferType);
  return typeKeys[getRandomInteger(0, typeKeys.length - 1)];
};

const getOffer = (): Offer => ({
  id: datatype.number(),
  bedrooms: datatype.number(),
  city: getCity(),
  description: datatype.string(),
  goods: new Array(FAKE_ARRAY_LENGTH).fill(null).map(datatype.string),
  host: getUser(),
  images: new Array(FAKE_ARRAY_LENGTH).fill(null).map(image.image),
  isFavorite: Boolean(getRandomInteger()),
  isPremium: Boolean(getRandomInteger()),
  location: getLocation(),
  maxAdults: datatype.number(),
  previewImage: datatype.string(),
  price: datatype.number(),
  rating: datatype.number(),
  title: datatype.string(),
  type: getRandomOfferTypeKey(),
});

const getOfferBackend = (): OfferBackend => ({
  id: datatype.number(),
  bedrooms: datatype.number(),
  city: getCity(),
  description: datatype.string(),
  goods: new Array(FAKE_ARRAY_LENGTH).fill(null).map(datatype.string),
  host: getUserBackend(),
  images: new Array(FAKE_ARRAY_LENGTH).fill(null).map(image.image),
  'is_favorite': Boolean(getRandomInteger()),
  'is_premium': Boolean(getRandomInteger()),
  location: getLocation(),
  'max_adults': datatype.number(),
  'preview_image': datatype.string(),
  price: datatype.number(),
  rating: datatype.number(),
  title: datatype.string(),
  type: datatype.string(),
});

const getReview = (): Review => ({
  id: datatype.number(),
  comment: datatype.string(),
  date: (new Date()).toISOString(),
  rating: datatype.number(5),
  user: getUser(),
});

const getReviewBackend = (): ReviewBackend => ({
  id: datatype.number(),
  comment: datatype.string(),
  date: (new Date()).toISOString(),
  rating: datatype.number(5),
  user: getUserBackend(),
});

export {
  getUser,
  getUserBackend,
  getLocation,
  getOffer,
  getOfferBackend,
  getReview,
  getReviewBackend
};
