import {Offer} from '../../types/types';
import FavoriteLocation from '../favorite-location/favorite-location';
import FavoritesEmpty from '../favorites-empty/favorites-empty';
import {getGroupedOffers} from '../../utils/utils';

type FavoritesProps = {
  offers: Offer[],
}

function Favorites({offers}: FavoritesProps): JSX.Element {
  if (!offers.length) {
    return <FavoritesEmpty/>;
  }

  const groupedOffers = getGroupedOffers(offers);
  const cities = Object.keys(groupedOffers);

  return (
    <section className="favorites" data-testid="favorites">
      <h1 className="favorites__title">Saved listing</h1>
      <ul className="favorites__list">
        {cities.map((cityName) => <FavoriteLocation key={cityName} offers={groupedOffers[cityName]} cityName={cityName}/>)}
      </ul>
    </section>
  );
}

export default Favorites;
