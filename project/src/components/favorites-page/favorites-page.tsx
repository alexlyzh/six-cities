import {Link} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../constants';
import Header from '../header/header';
import Favorites from '../favorites/favorites';
import {useDispatch, useSelector} from 'react-redux';
import {ActionsAPI} from '../../store/api-actions';
import {getFavorites} from '../../store/reducer/data/selectors';
import {getAuthStatus} from '../../store/reducer/user/selectors';
import {useEffect} from 'react';
import LoadingComponent from '../loading-component/loading-component';
import './favorites-page.css';

function FavoritesPage(): JSX.Element {
  const dispatch = useDispatch();
  const favorites = useSelector(getFavorites);
  const authorizationStatus = useSelector(getAuthStatus);

  const shouldLoadFavorites = favorites.requestStatus === 'IDLE' && authorizationStatus === AuthorizationStatus.AUTH;

  useEffect(() => {
    if (shouldLoadFavorites) {
      dispatch(ActionsAPI.getFavorites());
    }
  }, [shouldLoadFavorites, dispatch]);

  return (
    <div className="page favorites-page" data-testid="favorites-page">
      <Header/>

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          {
            favorites.requestStatus === 'PENDING' ? <LoadingComponent/> : <Favorites offers={favorites.data}/>
          }
        </div>
      </main>
      <footer
        className="footer container"
        style={{marginTop: 'auto'}}
      >
        <Link to={AppRoute.ROOT} className="footer__logo-link">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33"/>
        </Link>
      </footer>
    </div>
  );
}

export default FavoritesPage;
