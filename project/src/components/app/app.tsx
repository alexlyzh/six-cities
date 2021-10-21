import {BrowserRouter, Route, Switch} from 'react-router-dom';
import MainPage from '../main-page/main-page';
import NotFoundPage from '../not-found-page/not-found-page';
import FavoritesPage from '../favorites-page/favorites-page';
import LoginPage from '../login-page/login-page';
import OfferPage from '../offer-page/offer-page';
import {AppRoute, AuthorizationStatus} from '../../constants';
import PrivateRoute from '../private-route/private-route';
import {Comment} from '../../types/comments';
import {State} from '../../types/state';
import {connect, ConnectedProps} from 'react-redux';

type AppProps = {
  comments: Comment[],
}

const mapStateToProps = ({offers}: State) => ({
  offers,
});

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = AppProps & PropsFromRedux;

function App({ offers, comments }: ConnectedComponentProps): JSX.Element {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={AppRoute.ROOT}>
          <MainPage offers={offers}/>
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
          path={AppRoute.OFFER}
          render={(serviceProps) => {
            const id = Number(serviceProps.match.params.id);
            const offer = offers.find((item) => item.id === id);
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

export default connector(App);
