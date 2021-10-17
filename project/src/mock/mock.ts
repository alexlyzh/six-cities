import {City} from '../types/offers';

const offers = [
  {
    id: 1,
    bedrooms: 3,
    city: {
      location: {
        latitude: 52.373057,
        longitude: 4.892557,
        zoom: 12,
      },
      name: 'Amsterdam',
    },
    description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    goods: ['Heating', 'Kitchen', 'Cable TV', 'Washing machine', 'Coffee machine', 'Dishwasher'],
    host: {
      avatarUrl: 'img/1.png',
      id: 3,
      isPro: true,
      name: 'Angelina',
    },
    images: ['img/1.png', 'img/2.png'],
    isFavorite: true,
    isPremium: true,
    location: {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198,
      zoom: 10,
    },
    maxAdults: 4,
    previewImage: 'img/apartment-01.jpg',
    price: 120,
    rating: 4.8,
    title: 'Beautiful & luxurious studio at great location',
    type: 'apartment',
  },
  {
    id: 2,
    bedrooms: 2,
    city: {
      location: {
        latitude: 52.373057,
        longitude: 4.892557,
        zoom: 12,
      },
      name: 'Amsterdam',
    },
    description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    goods: ['Heating', 'Kitchen', 'Cable TV', 'Washing machine', 'Coffee machine', 'Dishwasher'],
    host: {
      avatarUrl: 'img/1.png',
      id: 3,
      isPro: true,
      name: 'Alex',
    },
    images: ['img/1.png', 'img/2.png'],
    isFavorite: false,
    isPremium: false,
    location: {
      latitude: 52.369553943508,
      longitude: 4.85309666406198,
      zoom: 10,
    },
    maxAdults: 4,
    previewImage: 'img/room.jpg',
    price: 80,
    rating: 4,
    title: 'Wood and stone place',
    type: 'hotel',
  },
  {
    id: 3,
    bedrooms: 5,
    city: {
      location: {
        latitude: 52.373057,
        longitude: 4.892557,
        zoom: 12,
      },
      name: 'Amsterdam',
    },
    description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    goods: ['Heating', 'Kitchen', 'Cable TV', 'Washing machine', 'Coffee machine', 'Dishwasher'],
    host: {
      avatarUrl: 'img/1.png',
      id: 3,
      isPro: true,
      name: 'Alex',
    },
    images: ['img/1.png', 'img/2.png'],
    isFavorite: true,
    isPremium: false,
    location: {
      latitude: 52.3909553943508,
      longitude: 4.929309666406198,
      zoom: 10,
    },
    maxAdults: 4,
    previewImage: 'img/apartment-02.jpg',
    price: 132,
    rating: 5,
    title: 'Canal View Prinsengracht',
    type: 'room',
  },
  {
    id: 4,
    bedrooms: 5,
    city: {
      location: {
        latitude: 52.373057,
        longitude: 4.892557,
        zoom: 12,
      },
      name: 'Amsterdam',
    },
    description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    goods: ['Heating', 'Washing machine', 'Coffee machine', 'Dishwasher'],
    host: {
      avatarUrl: 'img/1.png',
      id: 3,
      isPro: true,
      name: 'Keks',
    },
    images: ['img/1.png', 'img/2.png'],
    isFavorite: true,
    isPremium: false,
    location: {
      latitude: 52.3809553943508,
      longitude: 4.939309666406198,
      zoom: 10,
    },
    maxAdults: 4,
    previewImage: 'img/apartment-03.jpg',
    price: 180,
    rating: 2,
    title: 'Nice, cozy, warm big bed apartment',
    type: 'house',
  },
];

const comments = [
  {
    id: 1,
    comment: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    date: '2019-05-08T14:13:56.569Z',
    rating: 4,
    user: {
      avatarUrl: 'img/avatar-angelina.jpg',
      id: 4,
      isPro: true,
      name: 'Angelina',
    },
  },
  {
    id: 2,
    comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    date: '2019-05-08T13:13:56.569Z',
    rating: 5,
    user: {
      avatarUrl: 'img/avatar-max.jpg',
      id: 3,
      isPro: false,
      name: 'Max',
    },
  },
];

const mockAmsterdam: City = {
  location: {
    latitude: 52.373057,
    longitude: 4.892557,
    zoom: 12,
  },
  name: 'Amsterdam',
};

export {offers, comments, mockAmsterdam};
