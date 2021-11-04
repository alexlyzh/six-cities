import {Offer} from '../../types/types';
import FavoriteLocation from '../favorite-location/favorite-location';
import FavoritesEmpty from '../favorites-empty/favorites-empty';

type FavoritesProps = {
  offers: Offer[],
}

const getGroupedOffers = (offers: Offer[]) => {
  const groupedOffers = new Map();

  offers.forEach((offer) => {
    const cityName = offer.city.name;
    if (groupedOffers.has(cityName)) {
      groupedOffers.get(cityName).push(offer);
      return;
    }
    groupedOffers.set(cityName, [offer]);
  });

  return groupedOffers;
};

function Favorites({offers}: FavoritesProps): JSX.Element {
  if (!offers.length) {
    return <FavoritesEmpty/>;
  }

  const groupedOffers = getGroupedOffers(offers);
  const cities = Array.from(groupedOffers.keys());

  return (
    <section className="favorites">
      <h1 className="favorites__title">Saved listing</h1>
      <ul className="favorites__list">
        {cities.map((cityName) => <FavoriteLocation key={cityName} offers={groupedOffers.get(cityName)} cityName={cityName}/>)}
      </ul>
    </section>
  );
}

export default Favorites;
