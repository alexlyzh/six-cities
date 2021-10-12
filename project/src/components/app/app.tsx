import {BrowserRouter, Route, Switch} from 'react-router-dom';
import MainPage from '../main-page/main-page';
import NotFoundPage from '../not-found-page/not-found-page';
import FavoritesPage from '../favorites-page/favorites-page';
import LoginPage from '../login-page/login-page';
import OfferPage from '../offer-page/offer-page';
import {AppRoute, AuthorizationStatus} from '../../constants';
import PrivateRoute from '../private-route/private-route';
import {Offers} from '../../types/offers';
import {Comments} from '../../types/comments';

type AppProps = {
  offers: Offers,
  comments: Comments,
}

function App({ offers, comments }: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={AppRoute.ROOT}>
          <MainPage
            offers={offers}
          />
        </Route>
        <Route exact path={AppRoute.LOGIN}>
          <LoginPage/>
        </Route>
        <PrivateRoute
          exact
          path={AppRoute.FAVORITES}
          render={() => <FavoritesPage offers={offers}/>}
          authorizationStatus={AuthorizationStatus.AUTH}
        />
        <Route
          exact
          path={`${AppRoute.OFFER}/:id`}
          render={(serviceProps) => {
            const id = Number(serviceProps.match.params.id);
            const offer = offers.find((item) => item.id === id) || null;
            return (
              <OfferPage
                offer={offer}
                comments={comments}
                authorizationStatus={AuthorizationStatus.AUTH}
              />);
          }}
        />
        <Route>
          <NotFoundPage/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
