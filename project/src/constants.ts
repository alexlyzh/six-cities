import {OfferCardStyle} from './types/offers';

const AppRoute = {
  ROOT: '/',
  LOGIN: '/login',
  FAVORITES: '/favorites',
  OFFER: '/offer/:id',
} as const;

const PageName = {
  ROOT: 'root',
  FAVORITES: 'favorites',
  OFFER: 'offer',
} as const;

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

const OfferCardStyleByPageName: OfferCardStyle = {
  [PageName.ROOT]: {
    className: 'cities__place-card',
    imageClassName: 'cities__image-wrapper',
    infoClassName: '',
    imageWidth: 260,
    imageHeight: 200,
  },
  [PageName.FAVORITES]: {
    className: 'favorites__card',
    imageClassName: 'favorites__image-wrapper',
    infoClassName: 'favorites__card-info',
    imageWidth: 150,
    imageHeight: 110,
  },
} as const;

const MapMarkerURL = {
  DEFAULT: 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg',
  CURRENT: 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/main-pin.svg',
} as const;

const MapHeightByPageName = {
  [PageName.ROOT]: '700px',
  [PageName.OFFER]: '580px',
};

export {
  AppRoute,
  AuthorizationStatus,
  Rating,
  OfferType,
  MapMarkerURL,
  MapHeightByPageName,
  OfferCardStyleByPageName,
  PageName
};
