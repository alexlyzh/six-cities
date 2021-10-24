type Location = {
  latitude: number,
  longitude: number,
  zoom: number,
}

type City = {
  location: Location,
  name: string,
}

type Host = {
  avatarUrl: string,
  id: number,
  isPro: boolean,
  name: string,
}

type Offer = {
  id: number,
  bedrooms: number,
  city: City,
  description: string,
  goods: string[],
  host: Host,
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

type HostBackend = {
  'avatar_url': string,
  id: number,
  'is_pro': boolean,
  name: string,
}

type OfferBackend = {
  id: number,
  bedrooms: number,
  city: City,
  description: string,
  goods: string[],
  host: HostBackend,
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

export type { Offer, OfferBackend, City, Location, Host, HostBackend };
