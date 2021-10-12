const FAVORITE_OFFER_CLASSNAME = 'place-card__bookmark-button--active';

enum AppRoute {
  ROOT = '/',
  LOGIN = '/login',
  FAVORITES = '/favorites',
  OFFER = '/offer',
}

enum AuthorizationStatus {
  AUTH = 'auth',
  NO_AUTH = 'no-auth',
}

const Rating = {
  MAX_RATING_PERCENT: 100,
  RATING_MULTIPLIER: 20,
} as const;

export {FAVORITE_OFFER_CLASSNAME, AppRoute, AuthorizationStatus, Rating};
