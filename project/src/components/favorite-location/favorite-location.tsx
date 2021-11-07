import {Link} from 'react-router-dom';
import {AppRoute} from '../../constants';
import {Offer} from '../../types/types';
import {OffersList} from '../offers-list/offers-list';
import {useDispatch} from 'react-redux';
import {ActionCreator} from '../../store/actions';

type FavoriteLocationProps = {
  offers: Offer[],
  cityName: string,
}

function FavoriteLocation({offers, cityName}: FavoriteLocationProps): JSX.Element {
  const dispatch = useDispatch();

  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <Link
            to={AppRoute.ROOT}
            className="locations__item-link"
            onClick={() => dispatch(ActionCreator.changeCity(cityName))}
          >
            <span>{cityName}</span>
          </Link>
        </div>
      </div>
      <div className="favorites__places">
        <OffersList
          offers={offers}
          className="favorites__card"
          imageClassName="favorites__image-wrapper"
          infoClassName="favorites__card-info"
          imageWidth={150}
          imageHeight={110}
        />
      </div>
    </li>
  );
}

export default FavoriteLocation;
