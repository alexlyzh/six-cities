import {Token} from '../services/token';

type Location = {
  latitude: number,
  longitude: number,
  zoom: number,
}

type City = {
  location: Location,
  name: string,
}

type User = {
  avatarUrl: string,
  id: number,
  isPro: boolean,
  name: string,
  email?: string,
  token?: Token,
}

type Offer = {
  id: number,
  bedrooms: number,
  city: City,
  description: string,
  goods: string[],
  host: User,
  images: string[],
  isFavorite: boolean,
  isPremium: boolean,
  location: Location,
  maxAdults: number,
  previewImage: string,
  price: number,
  rating: number,
  title: string,
  type: string,
}

type UserBackend = {
  'avatar_url': string,
  id: number,
  'is_pro': boolean,
  name: string,
  email?: string,
  token?: Token,
}

type OfferBackend = {
  id: number,
  bedrooms: number,
  city: City,
  description: string,
  goods: string[],
  host: UserBackend,
  images: string[],
  'is_favorite': boolean,
  'is_premium': boolean,
  location: Location,
  'max_adults': number,
  'preview_image': string,
  price: number,
  rating: number,
  title: string,
  type: string,
}

type Review = {
  id: number,
  comment: string,
  date: string,
  rating: number,
  user: User,
}

type ReviewBackend = Omit<Review, 'user'> & {
  user: UserBackend,
}

export type { Offer, OfferBackend, City, Location, User, UserBackend, Review, ReviewBackend };
