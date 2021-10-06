import {BrowserRouter, Route, Switch} from 'react-router-dom';
import MainPage from '../main/main-page';
import NotFoundPage from '../page-not-found/not-found-page';
import FavoritesPage from '../favorites/favorites-page';
import LoginPage from '../login/login-page';
import OfferPage from '../property/offer-page';
import {AppRoute, AuthorizationStatus} from '../../constants';
import PrivateRoute from '../private-route/private-route';

interface Props {
  cardsCount: number,
}

function App({ cardsCount }: Props): JSX.Element {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={AppRoute.ROOT}>
          <MainPage cardsCount={cardsCount}/>
        </Route>
        <Route exact path={AppRoute.LOGIN}>
          <LoginPage/>
        </Route>
        <PrivateRoute
          exact
          path={AppRoute.FAVORITES}
          render={() => <FavoritesPage/>}
          authorizationStatus={AuthorizationStatus.NO_AUTH}
        />
        <Route exact path={AppRoute.OFFER}>
          <OfferPage/>
        </Route>
        <Route>
          <NotFoundPage/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
