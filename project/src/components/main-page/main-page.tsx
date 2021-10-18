import {Link} from 'react-router-dom';
import Header from '../header/header';
import {Offer} from '../../types/offers';
import {OffersList} from '../offers-list/offers-list';
import {AppRoute} from '../../constants';
import Map from '../map/map';
import {mockAmsterdam} from '../../mock/mock';
import useSelectedOffer from '../../hooks/useSelectedOffer';

type MainPageProps = {
  offers: Offer[],
}

function MainPage(props: MainPageProps): JSX.Element {
  const { offers } = props;
  const [selectedOffer, onChangeSelectedOffer] = useSelectedOffer(offers);

  return (
    <div className="page page--gray page--main">
      <Header/>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              <li className="locations__item">
                <Link to={AppRoute.ROOT} className="locations__item-link tabs__item">
                  <span>Paris</span>
                </Link>
              </li>
              <li className="locations__item">
                <Link to={AppRoute.ROOT} className="locations__item-link tabs__item">
                  <span>Cologne</span>
                </Link>
              </li>
              <li className="locations__item">
                <Link to={AppRoute.ROOT} className="locations__item-link tabs__item">
                  <span>Brussels</span>
                </Link>
              </li>
              <li className="locations__item">
                <Link to={AppRoute.ROOT} className="locations__item-link tabs__item tabs__item--active">
                  <span>Amsterdam</span>
                </Link>
              </li>
              <li className="locations__item">
                <Link to={AppRoute.ROOT} className="locations__item-link tabs__item">
                  <span>Hamburg</span>
                </Link>
              </li>
              <li className="locations__item">
                <Link to={AppRoute.ROOT} className="locations__item-link tabs__item">
                  <span>Dusseldorf</span>
                </Link>
              </li>
            </ul>
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">312 places to stay in Amsterdam</b>
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
                  offers={offers}
                  className={'cities__place-card'}
                  imageClassName={'cities__image-wrapper'}
                  infoClassName={''}
                  imageWidth={260}
                  imageHeight={200}
                  onChangeSelectedOffer={onChangeSelectedOffer}
                />
              </div>
            </section>
            <div className="cities__right-section">
              <Map
                city={mockAmsterdam}
                offers={offers}
                selectedOffer={selectedOffer}
                className={'cities__map'}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainPage;
