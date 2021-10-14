import {Link} from 'react-router-dom';
import OfferCard from '../offer-card/offer-card';
import {AppRoute} from '../../constants';
import {Offer} from '../../types/offers';

type FavoriteLocationProps = {
  offers: Offer[],
  cityName: string,
}

function FavoriteLocation({offers, cityName}: FavoriteLocationProps): JSX.Element {
  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <Link to={AppRoute.ROOT} className="locations__item-link">
            <span>{cityName}</span>
          </Link>
        </div>
      </div>
      <div className="favorites__places">
        {offers.map((offer) => (
          <OfferCard
            key={offer.id}
            offer={offer}
          />))}
      </div>
    </li>
  );
}

export default FavoriteLocation;
