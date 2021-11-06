import Header from '../header/header';
import FeedbackForm from '../feedback-form/feedback-form';
import {Offer} from '../../types/types';
import {AuthorizationStatus, OfferType} from '../../constants';
import {getWidthByRating} from '../../utils';
import ReviewList from '../review-list/review-list';
import {OffersList} from '../offers-list/offers-list';
import Map from '../map/map';
import {useDispatch, useSelector} from 'react-redux';
import {ActionsAPI} from '../../store/api-actions';
import {useEffect} from 'react';
import {getNearOffers, getReviews} from '../../store/reducer/data/selectors';
import {getAuthStatus} from '../../store/reducer/user/selectors';

const MAX_IMAGES_COUNT = 6;

type OfferPageProps = {
  offer: Offer,
}

function OfferPage(props: OfferPageProps): JSX.Element {
  const {offer} = props;
  const { id, isFavorite, isPremium, price, title, type, rating, bedrooms, maxAdults } = offer;

  const dispatch = useDispatch();
  const reviews = useSelector(getReviews);
  const nearOffers = useSelector(getNearOffers);
  const authorizationStatus = useSelector(getAuthStatus);

  const shouldLoadReviews = !reviews[id];
  const shouldLoadNearOffers = !nearOffers[id];

  const offerReviews = !shouldLoadReviews ? reviews[id].data : [];
  const offerNearOffers = !shouldLoadReviews ? nearOffers[id].data : [];
  const offersForMap = [...offerNearOffers, offer];

  useEffect(() => {
    if (shouldLoadReviews) {
      dispatch(ActionsAPI.getReviews(id));
    }
  }, [shouldLoadReviews, dispatch, id]);

  useEffect(() => {
    if (shouldLoadNearOffers) {
      dispatch(ActionsAPI.getNearOffers(id));
    }
  }, [shouldLoadNearOffers, dispatch, id]);

  return (
    <div className="page">
      <Header/>

      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {offer.images.slice(0, MAX_IMAGES_COUNT).map((image) => (
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
                <button
                  className={`property__bookmark-button ${isFavorite ? 'property__bookmark-button--active' : ''} button`}
                  type="button"
                  onClick={() => dispatch(ActionsAPI.postFavorite(id, !isFavorite))}
                >
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

              {offerReviews.length ? <ReviewList reviews={offerReviews}/> : null}
              {authorizationStatus === AuthorizationStatus.AUTH && <FeedbackForm id={id}/>}

            </div>
          </div>
          <Map
            city={offer.city}
            offers={offersForMap}
            highlightedOffer={offer}
            className="property__map"
          />
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">

              {offerNearOffers.length ?
                <OffersList
                  offers={offerNearOffers}
                  className="near-places__card"
                  imageClassName="near-places__image-wrapper"
                  imageWidth={260}
                  imageHeight={200}
                /> : null}

            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default OfferPage;
