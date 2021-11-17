import {AuthorizationStatus} from '../../constants';
import Header from '../header/header';
import {Logo} from '../logo/logo';
import Favorites from '../favorites/favorites';
import {useDispatch, useSelector} from 'react-redux';
import {ActionsAPI} from '../../store/api-actions';
import {getFavorites} from '../../store/reducer/data/selectors';
import {getAuthStatus} from '../../store/reducer/user/selectors';
import {useEffect} from 'react';
import LoadingComponent from '../loading-component/loading-component';
import './favorites-page.css';

const LOADING_COMPONENT_WIDTH = '60vh';

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
            favorites.requestStatus === 'PENDING' ? <LoadingComponent height={LOADING_COMPONENT_WIDTH}/> : <Favorites offers={favorites.data}/>
          }
        </div>
      </main>
      <footer
        className="footer container"
        style={{marginTop: 'auto'}}
      >
        <Logo className={'footer__logo'} imageWidth={64} imageHeight={33}/>
      </footer>
    </div>
  );
}

export default FavoritesPage;
