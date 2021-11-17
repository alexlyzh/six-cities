import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import {generatePath, Router} from 'react-router-dom';
import {AppRoute, AuthorizationStatus, FAKE_ID} from '../../constants';
import OfferPage from './offer-page';
import {getOffer, getReview} from '../../utils/mock';
import thunk from 'redux-thunk';

const history = createMemoryHistory();

const mockStore = configureMockStore([thunk]);

describe('Component: OfferPage', () => {
  const offer = getOffer();
  offer.id = FAKE_ID;

  const review = getReview();
  review.id = offer.id;

  const nearOffer = getOffer();
  nearOffer.id = offer.id +1;

  history.push(generatePath(AppRoute.OFFER, {id: offer.id}));

  it('should render correctly when authorized with reviews & near offers loaded', () => {
    const store = mockStore({
      APP: {
        isSubmitting: false,
      },
      DATA: {
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
          <OfferPage offer={offer}/>
        </Router>
      </Provider>);

    expect(screen.getByTestId('feedback-form')).toBeInTheDocument();
    expect(screen.getByTestId('map')).toBeInTheDocument();
    expect(screen.getByTestId('reviews')).toBeInTheDocument();
    expect(screen.getByText(offer.title)).toBeInTheDocument();
    expect(screen.getByText(nearOffer.title)).toBeInTheDocument();
  });

  it('should render correctly when not authorized', () => {
    const store = mockStore({
      APP: {
        isSubmitting: false,
      },
      DATA: {
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
        authorizationStatus: AuthorizationStatus.NO_AUTH,
      },
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <OfferPage offer={offer}/>
        </Router>
      </Provider>);

    expect(screen.queryByTestId('feedback-form')).not.toBeInTheDocument();
  });

  it('should render correctly when reviews & near offers not loaded', () => {
    const store = mockStore({
      APP: {
        isSubmitting: false,
      },
      DATA: {
        reviews: {},
        nearOffers: {},
      },
      USER: {
        authorizationStatus: AuthorizationStatus.NO_AUTH,
      },
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <OfferPage offer={offer}/>
        </Router>
      </Provider>);

    expect(screen.queryByTestId('reviews')).not.toBeInTheDocument();
    expect(screen.queryByText(nearOffer.title)).not.toBeInTheDocument();
  });
});
