import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {AuthorizationStatus} from '../../constants';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {Router, Switch, Route} from 'react-router-dom';
import Header from './header';
import {AppRoute} from '../../constants';
import userEvent from '@testing-library/user-event';

const history = createMemoryHistory();

const mockStore = configureMockStore();

describe('Component: Header', () => {
  it('should render correctly when authorized', () => {
    const store = mockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.AUTH,
      },
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <Header/>
        </Router>
      </Provider>);

    expect(screen.queryByTestId('header-email')).toBeInTheDocument();
    expect(screen.queryByText('Sign out')).toBeInTheDocument();
    expect(screen.queryByText('Sign in')).not.toBeInTheDocument();
    expect(screen.getByTestId('header-logo')).toBeInTheDocument();
  });

  it('should render correctly when unauthorized', () => {
    const store = mockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.NO_AUTH,
      },
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <Header/>
        </Router>
      </Provider>);

    expect(screen.queryByTestId('header-email')).not.toBeInTheDocument();
    expect(screen.queryByText('Sign out')).not.toBeInTheDocument();
    expect(screen.queryByText('Sign in')).toBeInTheDocument();
    expect(screen.getByTestId('header-logo')).toBeInTheDocument();
  });

  it('should redirect to FAVORITES when authorized user clicks the link', () => {
    history.push(AppRoute.ROOT);

    const store = mockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.AUTH,
      },
      DATA: {
        favorites: {
          requestStatus: 'SUCCESS',
        },
      },
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route exact path={AppRoute.FAVORITES}>
              <h1>This is favorites page</h1>
            </Route>
            <Route path={AppRoute.ROOT}>
              <Header/>
            </Route>
          </Switch>
        </Router>
      </Provider>);

    userEvent.click(screen.getByTestId('header-redirect-link'));
    expect(screen.getByText('This is favorites page')).toBeInTheDocument();
  });

  it('should redirect to LOGIN when unauthorized user clicks the link', () => {
    history.push(AppRoute.ROOT);

    const store = mockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.NO_AUTH,
      },
      DATA: {
        favorites: {
          requestStatus: 'SUCCESS',
        },
      },
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route exact path={AppRoute.LOGIN}>
              <h1>This is login page</h1>
            </Route>
            <Route path={AppRoute.ROOT}>
              <Header/>
            </Route>
          </Switch>
        </Router>
      </Provider>);

    userEvent.click(screen.getByTestId('header-redirect-link'));
    expect(screen.getByText('This is login page')).toBeInTheDocument();
  });
});
