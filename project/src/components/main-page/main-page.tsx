import Header from '../header/header';
import LocationList from '../location-list/location-list';
import {Offer} from '../../types/offers';
import {OffersList} from '../offers-list/offers-list';
import Map from '../map/map';
import {mockAmsterdam} from '../../mock/mock';
import {appCityNames} from '../../constants';
import {State} from '../../types/state';
import {connect, ConnectedProps} from 'react-redux';
import MainEmpty from './main-empty';

type MainPageProps = {
  offers: Offer[],
};

const mapStateToProps = ({selectedCity, highlightedOffer}: State) => ({
  selectedCity,
  highlightedOffer,
});

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = MainPageProps & PropsFromRedux;

const getOffersInCity = (offers: Offer[], cityName: string) => offers.filter((offer) => offer.city.name === cityName);

function MainPage({offers, selectedCity, highlightedOffer}: ConnectedComponentProps): JSX.Element {

  const offersInCity = getOffersInCity(offers, selectedCity);

  return (
    <div className="page page--gray page--main">
      <Header/>
      <main className={`page__main page__main--index ${!offersInCity.length ? 'page__main--index-empty' : ''}`}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">

          <LocationList cityNames={appCityNames}/>

        </div>
        <div className="cities">
          <div className="cities__places-container container">
            {offersInCity.length ?
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{offersInCity.length} places to stay in {selectedCity}</b>
                <form className="places__sorting" action="#" method="get">
                  <span className="places__sorting-caption">Sort by</span>
                  <span className="places__sorting-type" tabIndex={0}>
                    Popular
                    <svg className="places__sorting-arrow" width="7" height="4">
                      <use xlinkHref="#icon-arrow-select"/>
                    </svg>
                  </span>
                  <ul className="places__options places__options--custom">
                    <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                    <li className="places__option" tabIndex={0}>Price: low to high</li>
                    <li className="places__option" tabIndex={0}>Price: high to low</li>
                    <li className="places__option" tabIndex={0}>Top rated first</li>
                  </ul>
                </form>
                <div className="cities__places-list places__list tabs__content">
                  <OffersList
                    offers={offersInCity}
                    className="cities__place-card"
                    imageClassName="cities__image-wrapper"
                    imageWidth={260}
                    imageHeight={200}
                  />
                </div>
              </section> :
              <MainEmpty
                city={selectedCity}
              />}
            <div className="cities__right-section">
              {offersInCity.length ?
                <Map
                  city={mockAmsterdam}
                  offers={offersInCity}
                  highlightedOffer={highlightedOffer}
                  className="cities__map"
                /> : null}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default connector(MainPage);
