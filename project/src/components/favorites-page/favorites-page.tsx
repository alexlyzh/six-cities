import {Link} from 'react-router-dom';
import {AppRoute} from '../../constants';
import Header from '../header/header';
import Favorites from '../favorites/favorites';
import FavoritesEmpty from '../favorites-empty/favorites-empty';
import {Offer} from '../../types/types';

type FavoritesPageProps = {
  offers: Offer[],
}

function FavoritesPage({offers}: FavoritesPageProps): JSX.Element {
  const favorites = offers.filter((offer) => offer.isFavorite);

  return (
    <div className="page">
      <Header/>

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          {favorites.length ? <Favorites offers={favorites}/> : <FavoritesEmpty/>}
        </div>
      </main>
      <footer className="footer container">
        <Link to={AppRoute.ROOT} className="footer__logo-link">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33"/>
        </Link>
      </footer>
    </div>
  );
}

export default FavoritesPage;
export type {FavoritesPageProps};
