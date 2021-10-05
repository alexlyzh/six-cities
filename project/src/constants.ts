enum AppRoute {
  ROOT = '/',
  LOGIN = '/login',
  FAVORITES = '/favorites',
  PROPERTY = '/property',
}

enum AuthorizationStatus {
  AUTH = 'auth',
  NO_AUTH = 'no-auth',
  UNKNOWN = 'unknown',
}

export {AppRoute, AuthorizationStatus};
