const INITIAL_CITY_NAME = 'Paris';

const SortType: {[key: string]: string} = {
  POPULAR: 'Popular',
  PRICE_DESCENDING: 'Price: high to low',
  PRICE_ASCENDING: 'Price: low to high',
  TOP_RATED: 'Top rated first',
};

const appCityNames = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

const AppRoute = {
  ROOT: '/',
  LOGIN: '/login',
  FAVORITES: '/favorites',
  OFFER: '/offer/:id',
} as const;

const APIRoute = {
  GetOffers: '/hotels',
  GetOffer: '/hotels/:id',
  GetNearOffers: '/hotels/:hotel_id/nearby',
  GetFavorites: '/favorite',
  PostFavorite: '/favorite/:hotel_id/:status',
  GetComments: '/comments/:hotel_id',
  PostComment: '/comments/:hotel_id',
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

export {
  AppRoute,
  AuthorizationStatus,
  Rating,
  OfferType,
  MapMarkerURL,
  INITIAL_CITY_NAME,
  appCityNames,
  SortType,
  APIRoute
};
