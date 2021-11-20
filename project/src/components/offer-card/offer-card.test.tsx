import {render, screen} from '@testing-library/react';
import OfferCard from './offer-card';
import {getOffer} from '../../utils/mock';
import {Router, Switch, Route, generatePath} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import {AppRoute, AuthorizationStatus, FAKE_ID, OfferType} from '../../constants';
import {Offer} from '../../types/types';
import userEvent from '@testing-library/user-event';

const OfferProps = {
  className: 'some',
  imageClassname: 'some',
  imageWidth: 20,
  imageHeight: 20,
} as const;

const offer = getOffer();
offer.id = FAKE_ID;

const history = createMemoryHistory();

const mockStore = configureMockStore();
const store = mockStore({
  USER: {
    authorizationStatus: AuthorizationStatus.AUTH,
  },
});

describe('Component: OfferCard', () => {

  const checkOfferCardRender = ({price, rating, title, type}: Offer) => {
    expect(screen.getByTestId('offer-card-price').textContent).toBe(`€${price}`);
    expect(screen.getByTestId('offer-card-rating').textContent).toBe(`Rating ${rating}`);
    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(OfferType[type])).toBeInTheDocument();
  };

  it('should render correctly', () => {
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

    checkOfferCardRender(offer);
  });

  it('should redirect to "OfferPage" after click on image or title', () => {
    history.push(AppRoute.ROOT);

    render(
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route exact path={AppRoute.ROOT}>
              <OfferCard
                offer={offer}
                className={OfferProps.className}
                imageClassName={OfferProps.imageClassname}
                imageWidth={OfferProps.imageWidth}
                imageHeight={OfferProps.imageHeight}
              />
            </Route>
            <Route exact path={generatePath(AppRoute.OFFER, {id: FAKE_ID})}>
              <h1>This is page offer/{FAKE_ID}</h1>
            </Route>
          </Switch>
        </Router>
      </Provider>);

    checkOfferCardRender(offer);

    userEvent.click(screen.getByTestId('offer-image-link'));
    expect(screen.getByText(`This is page offer/${FAKE_ID}`)).toBeInTheDocument();

    history.goBack();

    userEvent.click(screen.getByTestId('offer-title-link'));
    expect(screen.getByText(`This is page offer/${FAKE_ID}`)).toBeInTheDocument();
  });
});
