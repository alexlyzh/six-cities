enum AppRoute {
  ROOT = '/',
  LOGIN = '/login',
  FAVORITES = '/favorites',
  OFFER = '/offer/:id',
}

enum AuthorizationStatus {
  AUTH = 'auth',
  NO_AUTH = 'no-auth',
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

const LocationClassNamePrefix: {[key: string]: string} = {
  [AppRoute.ROOT]: 'cities',
  [AppRoute.FAVORITES]: 'favorites',
} as const;

const LocationPreviewSize: {[key: string]: {width: number, height: number}} = {
  [AppRoute.ROOT]: {
    width: 260,
    height: 200,
  },
  [AppRoute.FAVORITES]: {
    width: 150,
    height: 110,
  },
} as const;

export {
  AppRoute,
  AuthorizationStatus,
  Rating,
  OfferType,
  LocationClassNamePrefix,
  LocationPreviewSize
};
