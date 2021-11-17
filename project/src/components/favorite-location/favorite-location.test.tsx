import {configureMockStore} from '@jedmao/redux-mock-store';
import {AuthorizationStatus, FAKE_ARRAY_LENGTH, INITIAL_CITY_NAME} from '../../constants';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import FavoriteLocation from './favorite-location';
import * as Mock from '../../utils/mock';
import {createMemoryHistory} from 'history';
import {Router} from 'react-router-dom';

const fakeProps = {
  offers: new Array(FAKE_ARRAY_LENGTH).fill(null).map(Mock.getOffer),
  cityName: INITIAL_CITY_NAME,
} as const;

const history = createMemoryHistory();

const mockStore = configureMockStore();
const store = mockStore({
  USER: {
    authorizationStatus: AuthorizationStatus.AUTH,
  },
});

describe('Component: FavoriteLocation', () => {
  it('should render if authorized', () => {
    if (store.getState().USER.authorizationStatus === AuthorizationStatus.AUTH) {
      render(
        <Provider store={store}>
          <Router history={history}>
            <FavoriteLocation
              offers={fakeProps.offers}
              cityName={fakeProps.cityName}
            />
          </Router>
        </Provider>);
    }

    expect(screen.queryByTestId('favorite-location')).toBeInTheDocument();
  });
});
