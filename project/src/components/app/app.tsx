import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Main from '../main/main';
import PageNotFound from '../page-not-found/page-not-found';
import Favorites from '../favorites/favorites';
import Login from '../login/login';
import Property from '../property/property';
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
          <Main cardsCount={cardsCount}/>
        </Route>
        <Route exact path={AppRoute.LOGIN}>
          <Login/>
        </Route>
        <PrivateRoute
          exact
          path={AppRoute.FAVORITES}
          render={() => <Favorites/>}
          authorizationStatus={AuthorizationStatus.NO_AUTH}
        />
        <Route exact path={AppRoute.PROPERTY}>
          <Property/>
        </Route>
        <Route>
          <PageNotFound/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
