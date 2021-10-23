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
import SortForm from '../sort-form/sort-form';
import {Sort} from '../../utils';
import useHighlightedOffer from '../../hooks/useHighlightedOffer';


type MainPageProps = {
  offers: Offer[],
};

const mapStateToProps = ({selectedCity, currentSort}: State) => ({
  selectedCity,
  currentSort,
});

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = MainPageProps & PropsFromRedux;

const getOffersInCity = (offers: Offer[], cityName: string) => offers.filter((offer) => offer.city.name === cityName);

function MainPage({offers, selectedCity, currentSort}: ConnectedComponentProps): JSX.Element {
  const sortedOffers = Sort[currentSort](offers);
  const offersInCity = getOffersInCity(sortedOffers, selectedCity);
  const [highlightedOffer, onChangeHighlightedOffer] = useHighlightedOffer(offersInCity);

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
                <SortForm/>
                <div className="cities__places-list places__list tabs__content">
                  <OffersList
                    offers={offersInCity}
                    className="cities__place-card"
                    imageClassName="cities__image-wrapper"
                    imageWidth={260}
                    imageHeight={200}
                    onChangeHighlightedOffer={onChangeHighlightedOffer}
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
