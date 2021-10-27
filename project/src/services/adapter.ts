import {User, UserBackend, Offer, OfferBackend} from '../types/offers';

class Adapter {
  static offerToClient(offer: OfferBackend): Offer {
    return {
      id: offer['id'],
      bedrooms: offer['bedrooms'],
      city: offer['city'],
      description: offer['description'],
      goods: offer['goods'],
      host: Adapter.userToClient(offer['host']),
      images: offer['images'],
      isFavorite: offer['is_favorite'],
      isPremium: offer['is_premium'],
      location: offer['location'],
      maxAdults: offer['max_adults'],
      previewImage: offer['preview_image'],
      price: offer['price'],
      rating: offer['rating'],
      title: offer['title'],
      type: offer['type'],
    };
  }

  static userToClient(user: UserBackend): User {
    return {
      avatarUrl: user['avatar_url'],
      id: user['id'],
      isPro: user['is_pro'],
      name: user['name'],
      email: user['email'],
      token: user['token'],
    };
  }
}

export default Adapter;
