import {render, screen} from '@testing-library/react';
import OfferCard from './offer-card';
import {getOffer} from '../../utils/mock';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import {AuthorizationStatus, FAKE_ID, OfferType} from '../../constants';

const OfferProps = {
  className: 'some',
  imageClassname: 'some',
  imageWidth: 20,
  imageHeight: 20,
} as const;

const history = createMemoryHistory();

const offer = getOffer();
offer.id = FAKE_ID;

const mockStore = configureMockStore();
const store = mockStore({
  USER: {
    authorizationStatus: AuthorizationStatus.AUTH,
  },
});

describe('Component: OfferCard', () => {
  it('should render correctly', () => {
    const {price, rating, title, type} = offer;

    render(
      <Provider store={store}>
        <Router history={history}>
          <OfferCard
            offer={offer}
            className={OfferProps.className}
            imageClassName={OfferProps.imageClassname}
            imageWidth={OfferProps.imageWidth}
            imageHeight={OfferProps.imageHeight}
          />
        </Router>
      </Provider>);

    expect(screen.getByTestId('offer-card-price').textContent).toBe(`€${price}`);
    expect(screen.getByTestId('offer-card-rating').textContent).toBe(`Rating ${rating}`);
    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(OfferType[type])).toBeInTheDocument();
  });
});
