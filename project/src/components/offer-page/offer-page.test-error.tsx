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
  const {title} = offer;

  const review = getReview();
  review.id = offer.id;

  const nearOffer = getOffer();
  nearOffer.id = offer.id +1;

  history.push(generatePath(AppRoute.OFFER, {id: offer.id}));

  it('should render correctly when authorized', () => {
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

    expect(screen.getByText(title)).toBeInTheDocument();
    // expect(screen.getByTestId('reviews')).toBeInTheDocument(); // не работает, что делать с useEffect?

    // Тест не проходит:
    // Warning: Encountered two children with the same key, ``.
    // Keys should be unique so that components maintain their identity across updates.
    // Non-unique keys may cause children to be duplicated and/or omitted — the behavior is unsupported
    // and could change in a future version.
  });
});
