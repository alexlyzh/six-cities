import {Offers, Offer} from '../../types/offers';
import {FavoritesPageProps} from '../favorites-page/favorites-page';
import FavoriteLocation from '../favorite-location/favorite-location';

type FavoritesProps = FavoritesPageProps;

const getCities = (offers: Offers) => {
  const cities = new Map();

  offers.forEach((offer: Offer) => {
    const city = offer.city.name.toLowerCase();
    if (cities.has(city)) {
      cities.get(city).push(offer);
      return;
    }
    cities.set(city, [offer]);
  });

  return cities;
};


function Favorites({offers}: FavoritesProps): JSX.Element {
  const uniqueCityNames = [...new Set(offers.map((offer: Offer) => offer.city.name.toLowerCase()))];
  const cities = getCities(offers);

  return (
    <section className="favorites">
      <h1 className="favorites__title">Saved listing</h1>
      <ul className="favorites__list">
        {uniqueCityNames.map((cityName: string) => <FavoriteLocation key={cityName} offers={cities.get(cityName)} cityName={cityName}/>)}
      </ul>
    </section>
  );
}

export default Favorites;
