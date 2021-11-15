import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {AuthorizationStatus, FAKE_ARRAY_LENGTH} from '../../constants';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import {render, screen} from '@testing-library/react';
import {OffersList} from './offers-list';
import {getOffer} from '../../utils/mock';

const OfferProps = {
  className: 'some',
  imageClassName: 'some',
  imageWidth: 20,
  imageHeight: 20,
} as const;

const offers = new Array(FAKE_ARRAY_LENGTH).fill(null).map(getOffer);

const history = createMemoryHistory();

const mockStore = configureMockStore();
const store = mockStore({
  USER: {
    authorizationStatus: AuthorizationStatus.AUTH,
  },
  DATA: {
    offers,
  },
});

describe('Component: OffersList', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <OffersList
            offers={offers}
            className={OfferProps.className}
            imageClassName={OfferProps.imageClassName}
            imageWidth={OfferProps.imageWidth}
            imageHeight={OfferProps.imageHeight}
          />
        </Router>
      </Provider>);

    expect(screen.getAllByTestId('offer-card').length).toEqual(offers.length);
  });
});
