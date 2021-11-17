import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {generatePath, Router} from 'react-router-dom';
import {getOffer, getReview} from '../../utils/mock';
import App from './app';
import {render, screen} from '@testing-library/react';
import {AppRoute, AuthorizationStatus, FAKE_ARRAY_LENGTH, FAKE_ID, INITIAL_CITY_NAME, SortType} from '../../constants';
import * as Mock from '../../utils/mock';
import thunk from 'redux-thunk';

const offers = new Array(FAKE_ARRAY_LENGTH)
  .fill(null)
  .map(Mock.getOffer)
  .map((offer) => {
    offer.city.name = INITIAL_CITY_NAME;
    return offer;
  });

const checkMainPageRender = () => {
  expect(screen.getByText(`${offers.length} places to stay in ${INITIAL_CITY_NAME}`)).toBeInTheDocument();
  expect(screen.getByTestId('sort-form')).toBeInTheDocument();
  expect(screen.getByTestId('map')).toBeInTheDocument();
};

const mockStore = configureMockStore([thunk]);

const history = createMemoryHistory();

describe('Application routing', () => {
  it('should render "MainPage" when navigating to "/"', () => {
    history.push(AppRoute.ROOT);
    const store = mockStore({
      APP: {
        selectedCity: INITIAL_CITY_NAME,
        currentSort: SortType.POPULAR,
      },
      DATA: {
        offers,
        isDataLoaded: true,
      },
      USER: {
        authorizationStatus: AuthorizationStatus.AUTH,
      },
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>);

    checkMainPageRender();
  });

  it('should render "LoginPage" when navigating to "/login" without authorization', () => {
    history.push(AppRoute.LOGIN);

    const store = mockStore({
      DATA: {
        offers,
        isDataLoaded: true,
      },
      USER: {
        authorizationStatus: AuthorizationStatus.NO_AUTH,
      },
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>);

    expect(screen.getByTestId('sign-in')).toBeInTheDocument();
    expect(screen.getByTestId('email')).toBeInTheDocument();
    expect(screen.getByTestId('password')).toBeInTheDocument();
  });

  it('should render "MainPage" when navigating to "/login" with authorization', () => {
    history.push(AppRoute.LOGIN);

    const store = mockStore({
      APP: {
        selectedCity: INITIAL_CITY_NAME,
        currentSort: SortType.POPULAR,
      },
      DATA: {
        offers,
        isDataLoaded: true,
      },
      USER: {
        authorizationStatus: AuthorizationStatus.AUTH,
      },
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>);

    checkMainPageRender();
    expect(screen.queryByTestId('sign-in')).not.toBeInTheDocument();
    expect(screen.queryByTestId('email')).not.toBeInTheDocument();
    expect(screen.queryByTestId('password')).not.toBeInTheDocument();
  });

  it('should render "Favorites" when user navigates to "/favorites"', () => {
    history.push(AppRoute.FAVORITES);

    const favoriteOffer = Mock.getOffer();
    favoriteOffer.isFavorite = true;

    const store = mockStore({
      DATA: {
        isDataLoaded: true,
        favorites: {
          requestStatus: 'SUCCESS',
          data: [favoriteOffer],
        },
      },
      USER: {
        authorizationStatus: AuthorizationStatus.AUTH,
      },
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>);

    expect(screen.getByText('Saved listing')).toBeInTheDocument();
    expect(screen.queryByText(favoriteOffer.city.name)).toBeInTheDocument();
    expect(screen.getByText(favoriteOffer.title)).toBeInTheDocument();
  });

  it('should render "OfferPage" when user navigates to "/offer/:id"', () => {
    const offer = Mock.getOffer();
    offer.id = FAKE_ID;

    const review = getReview();
    review.id = offer.id;

    const nearOffer = getOffer();
    nearOffer.id = offer.id +1;

    const connectedOffers = [offer, nearOffer];

    history.push(generatePath(AppRoute.OFFER, {id: offer.id}));

    const store = mockStore({
      APP: {
        isSubmitting: false,
      },
      DATA: {
        isDataLoaded: true,
        offers: connectedOffers,
        reviews: {
          [FAKE_ID]: {
            data: [review],
          },
        },
        nearOffers: {
          [FAKE_ID]: {
            data: [nearOffer],
          },
        },
      },
      USER: {
        authorizationStatus: AuthorizationStatus.AUTH,
      },
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>);

    expect(screen.getByText(offer.title)).toBeInTheDocument();
    expect(screen.getByTestId('map')).toBeInTheDocument();
  });

  it('should render "NotFoundPage" when user navigates to non-existent-route', () => {
    history.push('/non-existent-route');

    const store = mockStore({
      DATA: {
        offers,
        isDataLoaded: true,
      },
      USER: {
        authorizationStatus: AuthorizationStatus.AUTH,
      },
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>);

    expect(screen.getByText(/Page not found/i)).toBeInTheDocument();
  });
});
