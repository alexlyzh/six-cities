import {Route, Switch, Redirect} from 'react-router-dom';
import MainPage from '../main-page/main-page';
import NotFoundPage from '../not-found-page/not-found-page';
import FavoritesPage from '../favorites-page/favorites-page';
import LoginPage from '../login-page/login-page';
import OfferPage from '../offer-page/offer-page';
import {AppRoute, AuthorizationStatus} from '../../constants';
import PrivateRoute from '../private-route/private-route';
import {useSelector} from 'react-redux';
import LoadingScreen from '../loading-screen/loading-screen';
import {getIsDataLoaded, getOffers} from '../../store/reducer/data/selectors';
import {getAuthStatus} from '../../store/reducer/user/selectors';

function App(): JSX.Element {
  const offers = useSelector(getOffers);
  const authorizationStatus = useSelector(getAuthStatus);
  const isDataLoaded = useSelector(getIsDataLoaded);

  if (authorizationStatus === AuthorizationStatus.UNKNOWN || !isDataLoaded) {
    return <LoadingScreen/>;
  }

  return (
    <Switch>
      <Route exact path={AppRoute.ROOT}>
        <MainPage/>
      </Route>
      <Route exact path={AppRoute.LOGIN}>
        {authorizationStatus === AuthorizationStatus.AUTH ? <Redirect to={AppRoute.ROOT}/>: <LoginPage/>}
      </Route>
      <PrivateRoute
        exact
        path={AppRoute.FAVORITES}
        render={() => <FavoritesPage/>}
      />
      <Route
        exact
        path={AppRoute.OFFER}
        render={(renderProps) => {
          const id = Number(renderProps.match.params.id);
          const offer = offers.find((item) => item.id === id);

          if (!offer) {
            return <NotFoundPage/>;
          }
          return (
            <OfferPage
              offer={offer}
            />);
        }}
      />
      <Route>
        <NotFoundPage/>
      </Route>
    </Switch>
  );
}

export default App;
