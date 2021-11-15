import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {AuthorizationStatus, FAKE_ARRAY_LENGTH} from '../../constants';
import * as Mock from '../../utils/mock';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import Favorites from './favorites';
import {getGroupedOffers} from '../../utils/utils';

const history = createMemoryHistory();

const offers = new Array(FAKE_ARRAY_LENGTH).fill(null).map(Mock.getOffer);

const mockStore = configureMockStore();
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

describe('Component: Favorites', () => {
  it('should render correctly', () => {
    const offers = store.getState().DATA.favorites.data;
    const groupedOffers = getGroupedOffers(offers);
    const cities = Object.keys(groupedOffers);

    render(
      <Provider store={store}>
        <Router history={history}>
          <Favorites offers={offers}/>
        </Router>
      </Provider>);

    expect(screen.queryAllByTestId('favorite-location').length).toEqual(cities.length);
  });
});

export {};
