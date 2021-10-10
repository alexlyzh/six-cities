import {user} from './user';

type location = {
  latitude: number,
  longitude: number,
  zoom: number,
}

type city = {
  location: location,
  name: string,
}

type offer = {
  id: number,
  bedrooms: number,
  city: city,
  description: string,
  goods: string[],
  host: user,
  images: string[],
  isFavorite: boolean,
  isPremium: true,
  location: location,
  maxAdults: number,
  previewImage: string,
  price: number,
  rating: number,
  title: string,
  type: string,
}

type offers = offer[];

export type { offers };
