import Header from '../header/header';
import FeedbackForm from '../feedback-form/feedback-form';
import {Comment} from '../../types/comments';
import {Offer} from '../../types/offers';
import {AuthorizationStatus, OfferType} from '../../constants';
import {getWidthByRating} from '../../utils';
import ReviewList from '../review-list/review-list';
import {OffersList} from '../offers-list/offers-list';
import {offers, mockAmsterdam} from '../../mock/mock';
import NotFoundPage from '../not-found-page/not-found-page';
import Map from '../map/map';

type OfferPageProps = {
  authorizationStatus: string,
  comments: Comment[],
  offer?: Offer,
}

function OfferPage(props: OfferPageProps): JSX.Element {
  if (!props.offer) {
    return <NotFoundPage/>;
  }

  const {authorizationStatus, comments, offer} = props;
  const { id, isFavorite, isPremium, price, title, type, rating, bedrooms, maxAdults } = offer;

  const nearOffers = offers.filter((item) => item.id !== id);

  return (
    <div className="page">
      <Header/>

      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {offer.images.map((image) => (
                <div key={image} className="property__image-wrapper">
                  <img className="property__image" src={image} alt="Studio"/>
                </div>
              ))}
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">

              {isPremium &&
                <div className="property__mark">
                  <span>Premium</span>
                </div>}

              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {title}
                </h1>
                <button className={`property__bookmark-button ${isFavorite ? 'property__bookmark-button--active' : ''} button`} type="button">
                  <svg className="property__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"/>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{width: `${getWidthByRating(rating)}%`}}/>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  { OfferType[type] }
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {`${bedrooms} Bedrooms`}
                </li>
                <li className="property__feature property__feature--adults">
                  {`Max ${maxAdults} adults`}
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {offer.goods.map((good) => (
                    <li key={good} className="property__inside-item">
                      {good}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className={`property__avatar-wrapper ${offer.host.isPro ? 'property__avatar-wrapper--pro' : ''} user__avatar-wrapper`}>
                    <img className="property__avatar user__avatar" src={offer.host.avatarUrl} width="74" height="74" alt="Host avatar"/>
                  </div>
                  <span className="property__user-name">
                    {offer.host.name}
                  </span>
                  {offer.host.isPro &&
                  <span className="property__user-status">
                      Pro
                  </span>}
                </div>
                <div className="property__description">
                  <p className="property__text">
                    {offer.description}
                  </p>
                </div>
              </div>
              <section className="property__reviews reviews">

                <ReviewList comments={comments}/>
                {authorizationStatus === AuthorizationStatus.AUTH && <FeedbackForm/>}

              </section>
            </div>
          </div>
          <Map
            city={mockAmsterdam}
            offers={offers}
            highlightedOffer={offer}
            className="property__map"
          />
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">

              <OffersList
                offers={nearOffers}
                className="near-places__card"
                imageClassName="near-places__image-wrapper"
                imageWidth={260}
                imageHeight={200}
              />

            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default OfferPage;
