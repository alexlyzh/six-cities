import {User, UserBackend, Offer, OfferBackend} from '../types/offers';

class Adapter {
  static offerToClient(offer: OfferBackend): Offer {
    return {
      id: offer['id'],
      bedrooms: offer['bedrooms'],
      city: offer['city'],
      description: offer['description'],
      goods: offer['goods'],
      host: Adapter.hostToClient(offer['host']),
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

  static hostToClient(host: UserBackend): User {
    return {
      avatarUrl: host['avatar_url'],
      id: host['id'],
      isPro: host['is_pro'],
      name: host['name'],
    };
  }
}

export default Adapter;
