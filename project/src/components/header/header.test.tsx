import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {AuthorizationStatus} from '../../constants';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import Header from './header';

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
});
