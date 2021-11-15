import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {AuthorizationStatus, FAKE_ARRAY_LENGTH, INITIAL_CITY_NAME, SortType} from '../../constants';
import {Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import {render, screen} from '@testing-library/react';
import * as Mock from '../../utils/mock';
import MainPage from './main-page';

const offers = new Array(FAKE_ARRAY_LENGTH)
  .fill(null)
  .map(Mock.getOffer)
  .map((offer) => {
    offer.city.name = INITIAL_CITY_NAME;
    return offer;
  });

const history = createMemoryHistory();

const mockStore = configureMockStore();
const store = mockStore({
  APP: {
    selectedCity: INITIAL_CITY_NAME,
    currentSort: SortType.POPULAR,
  },
  DATA: {
    offers,
  },
  USER: {
    authorizationStatus: AuthorizationStatus.AUTH,
  },
});

describe('Component: MainPage', () => {

  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <MainPage/>
        </Router>
      </Provider>);

    expect(screen.getByTestId('header-component')).toBeInTheDocument();
    expect(screen.getByTestId('locations')).toBeInTheDocument();
    expect(screen.getByTestId('places-found').textContent).toEqual(`${offers.length} places to stay in ${INITIAL_CITY_NAME}`);
    expect(screen.getByTestId('sort-form')).toBeInTheDocument();
    expect(screen.getByTestId('map')).toBeInTheDocument();
  });
});
