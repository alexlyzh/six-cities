import {Link} from 'react-router-dom';
import {FavoriteCard} from '../favorite-card/favorite-card';
import {AppRoute} from '../../constants';
import {FavoritesPageProps} from '../favorites-page/favorites-page';
import {capitalize} from '../../utils';

type FavoriteLocationProps = FavoritesPageProps & {
  cityName: string,
}

function FavoriteLocation(props: FavoriteLocationProps): JSX.Element {
  const {offers, cityName} = props;

  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <Link to={AppRoute.ROOT} className="locations__item-link">
            <span>{capitalize(cityName)}</span>
          </Link>
        </div>
      </div>
      <div className="favorites__places">
        {offers.map((offer) => {
          const {id, previewImage, price, rating, title, type, isFavorite} = offer;
          return (
            <FavoriteCard
              key={id}
              id={id}
              previewImage={previewImage}
              price={price}
              title={title}
              type={type}
              isFavorite={isFavorite}
              rating={rating}
            />);
        })}
      </div>
    </li>
  );
}

export default FavoriteLocation;
