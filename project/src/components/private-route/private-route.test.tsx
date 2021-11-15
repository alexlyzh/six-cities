import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {AuthorizationStatus} from '../../constants';
import {Provider} from 'react-redux';
import {Router, Route} from 'react-router-dom';
import {render, screen} from '@testing-library/react';
import PrivateRoute from './private-route';

const history = createMemoryHistory();

const mockStore = configureMockStore();

describe('Component: PrivateRouter', () => {
  beforeEach(() => history.push('/private'));

  it('should render component for public route, when user not authorized', () => {
    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.NO_AUTH},
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <Route exact path="/login"><h1>Public Route</h1></Route>
          <PrivateRoute
            exact
            path="/private"
            render={() => (<h1>Private Route</h1>)}
          />
        </Router>
      </Provider>);

    expect(screen.queryByText(/Public Route/i)).toBeInTheDocument();
    expect(screen.queryByText(/Private Route/i)).not.toBeInTheDocument();
  });

  it('should render component for private route, when user authorized', () => {
    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.AUTH},
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <Route exact path="/login"><h1>Public Route</h1></Route>
          <PrivateRoute
            exact
            path="/private"
            render={() => (<h1>Private Route</h1>)}
          />
        </Router>
      </Provider>);

    expect(screen.queryByText(/Public Route/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Private Route/i)).toBeInTheDocument();
  });
});
