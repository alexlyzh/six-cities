import Header from '../header/header';
import LocationList from '../location-list/location-list';
import {OffersList} from '../offers-list/offers-list';
import Map from '../map/map';
import {CityGeoData} from '../../constants';
import {useSelector} from 'react-redux';
import MainEmpty from './main-empty';
import SortForm from '../sort-form/sort-form';
import useHighlightedOffer from '../../hooks/useHighlightedOffer';
import {getSelectedCity} from '../../store/reducer/app/selectors';
import {getCitySortedOffers} from '../../store/reducer/data/selectors';

function MainPage(): JSX.Element {
  const selectedCity = useSelector(getSelectedCity);
  const offersInCity = useSelector(getCitySortedOffers);

  const currentCity = CityGeoData[selectedCity];

  const [highlightedOffer, onChangeHighlightedOffer] = useHighlightedOffer(offersInCity);

  return (
    <div className="page page--gray page--main">
      <Header/>
      <main className={`page__main page__main--index ${!offersInCity.length ? 'page__main--index-empty' : ''}`}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <LocationList
            cityNames={Object.keys(CityGeoData)}
            selectedCity={selectedCity}
          />
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
                  city={currentCity}
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

export default MainPage;
