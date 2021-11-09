import {City} from './types/types';

const INITIAL_CITY_NAME = 'Paris';

const FAKE_ARRAY_LENGTH = 3;

const SortType: {[key: string]: string} = {
  POPULAR: 'Popular',
  PRICE_DESCENDING: 'Price: high to low',
  PRICE_ASCENDING: 'Price: low to high',
  TOP_RATED: 'Top rated first',
} as const;

const CityGeoData: {[key: string]: City} = {
  Paris: {
    name: 'Paris',
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 13,
    },
  },
  Dusseldorf: {
    name: 'Dusseldorf',
    location: {
      latitude: 51.225402,
      longitude: 6.776314,
      zoom: 13,
    },
  },
  Brussels: {
    name: 'Brussels',
    location: {
      latitude: 50.846557,
      longitude: 4.351697,
      zoom: 13,
    },
  },
  Cologne: {
    name: 'Cologne',
    location: {
      latitude: 50.938361,
      longitude: 6.959974,
      zoom: 13,
    },
  },
  Hamburg: {
    name: 'Hamburg',
    location: {
      latitude: 53.550341,
      longitude: 10.000654,
      zoom: 13,
    },
  },
  Amsterdam: {
    name: 'Amsterdam',
    location: {
      latitude: 52.37454,
      longitude: 4.897976,
      zoom: 13,
    },
  },
} as const;

enum AppRoute {
  ROOT = '/',
  LOGIN = '/login',
  FAVORITES = '/favorites',
  OFFER = '/offer/:id',
}

const APIRoute = {
  GetOffers: '/hotels',
  GetOffer: '/hotels/:id',
  GetNearOffers: '/hotels/:hotel_id/nearby',
  GetFavorites: '/favorite',
  PostFavorite: '/favorite/:hotel_id/:status',
  GetReviews: '/comments/:hotel_id',
  PostReview: '/comments/:hotel_id',
  Login: '/login',
  Logout: '/logout',
} as const;

enum AuthorizationStatus {
  AUTH = 'auth',
  NO_AUTH = 'no-auth',
  UNKNOWN = 'unknown',
}

const Rating = {
  MAX_RATING_PERCENT: 100,
  RATING_MULTIPLIER: 20,
} as const;

const OfferType: {[key: string]: string} = {
  room: 'Private room',
  house: 'House',
  apartment: 'Apartment',
  hotel: 'Hotel',
} as const;

const MapMarkerURL = {
  DEFAULT: 'img/pin.svg',
  CURRENT: 'img/pin-active.svg',
} as const;

const ErrorMessage = {
  PostReview: 'Something went wrong when sending your review...',
  GetReviews: 'Can\'t get reviews..',
  GetNearOffers: 'Can\'t get offers nearby..',
  Login: 'Login error...',
  Logout: 'Logout error...',
  GetFavorites: 'Can\'t get favorites...',
  PostFavorite: 'Can\'t post favorite...',
  NoAuthorization: 'Don\'t forget to sign in',
} as const;

const FavoritePathname = {
  addToFavorites: 1,
  removeFromFavorites: 0,
} as const;

enum HttpCode {
  Unauthorized = 401,
  OK = 200,
  NoContent = 204,
}

export {
  AppRoute,
  AuthorizationStatus,
  Rating,
  OfferType,
  MapMarkerURL,
  INITIAL_CITY_NAME,
  CityGeoData,
  SortType,
  APIRoute,
  ErrorMessage,
  FavoritePathname,
  HttpCode,
  FAKE_ARRAY_LENGTH
};
