import {createMemoryHistory} from 'history';
import {AppRoute, AuthorizationStatus} from '../../constants';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Router, Switch, Route} from 'react-router-dom';
import LoginPage from './login-page';
import userEvent from '@testing-library/user-event';

const history = createMemoryHistory();

const mockStore = configureMockStore();
const store = mockStore({
  USER: {
    authorizationStatus: AuthorizationStatus.NO_AUTH,
  },
});

describe('Component: LoginPage', () => {

  it('should render "LoginPage" when user navigates to LOGIN', () => {
    history.push(AppRoute.LOGIN);

    render(
      <Provider store={store}>
        <Router history={history}>
          <LoginPage/>
        </Router>
      </Provider>);

    const submitBtn = screen.getByTestId('sign-in');
    const emailElement = screen.getByTestId('email');
    const passwordElement = screen.getByTestId('password');

    expect(submitBtn).toBeInTheDocument();
    expect(emailElement).toBeInTheDocument();
    expect(passwordElement).toBeInTheDocument();

    userEvent.type(emailElement, 'some@email.com');
    userEvent.type(passwordElement, 'qwerty');

    expect(screen.getByDisplayValue('some@email.com')).toBeInTheDocument();
    expect(screen.getByDisplayValue('qwerty')).toBeInTheDocument();
  });

  it('should redirect to ROOT when user clicked the link', () => {
    history.push(AppRoute.LOGIN);

    render(
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route exact path={AppRoute.LOGIN}>
              <LoginPage/>
            </Route>
            <Route exact path={AppRoute.ROOT}>
              <h1>This is main page</h1>
            </Route>
          </Switch>
        </Router>
      </Provider>);

    const redirectLinkElement = screen.getByTestId('redirect-root');

    expect(redirectLinkElement).toBeInTheDocument();

    userEvent.click(redirectLinkElement);

    expect(screen.queryByText('This is main page')).toBeInTheDocument();
  });
});
