import {AuthorizationStatus, FAKE_ARRAY_LENGTH} from '../../constants';
import * as Mock from '../../utils/mock';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import FavoritesPage from './favorites-page';
import {createMemoryHistory} from 'history';
import {Router} from 'react-router-dom';

const offers = new Array(FAKE_ARRAY_LENGTH).fill(null).map(Mock.getOffer);

const history = createMemoryHistory();

const mockStore = configureMockStore();

describe('Component: FavoritesPage', () => {
  it('should render correctly', () => {
    const store = mockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.AUTH,
      },
      DATA: {
        favorites: {
          requestStatus: 'SUCCESS',
          data: offers,
        },
      },
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <FavoritesPage/>
        </Router>
      </Provider>);

    expect(screen.getByTestId('favorites-page')).toBeInTheDocument();
    expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
    expect(screen.getByTestId('favorites')).toBeInTheDocument();
  });

  it('should render spinner while loading favorites', () => {
    const store = mockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.AUTH,
      },
      DATA: {
        favorites: {
          requestStatus: 'PENDING',
          data: [],
        },
      },
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <FavoritesPage/>
        </Router>
      </Provider>);

    expect(screen.queryByTestId('favorites-page')).toBeInTheDocument();
    expect(screen.queryByTestId('spinner')).toBeInTheDocument();
    expect(screen.queryByTestId('favorites')).not.toBeInTheDocument();
  });
});
