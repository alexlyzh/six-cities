import {Link} from 'react-router-dom';
import {AppRoute} from '../../constants';
import {Offer} from '../../types/offers';
import {OffersList} from '../offers-list/offers-list';

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
        <OffersList
          offers={offers}
          className={'favorites__card'}
          imageClassName={'favorites__image-wrapper'}
          infoClassName={'favorites__card-info'}
          imageWidth={150}
          imageHeight={110}
        />
      </div>
    </li>
  );
}

export default FavoriteLocation;
