import {generatePath, Link, useLocation} from 'react-router-dom';
import {Offer} from '../../types/offers';
import {AppRoute, OfferType, LocationClassNamePrefix, LocationPreviewSize} from '../../constants';
import {getWidthByRating} from '../../utils';

type OfferCardProps = {
  offer: Offer,
}

function OfferCard(props: OfferCardProps): JSX.Element {
  const {id, previewImage, isFavorite, isPremium, price, title, type, rating } = props.offer;
  const pathname = useLocation().pathname;
  const prefix = LocationClassNamePrefix[pathname];
  const previewSize = LocationPreviewSize[pathname];

  return (
    <article className={`${prefix}__place-card place-card`}>
      {isPremium ?
        <div className="place-card__mark">
          <span>Premium</span>
        </div> : null}

      <div className={`${prefix}__image-wrapper place-card__image-wrapper`}>
        <Link to={`${generatePath(AppRoute.OFFER,{id})}`}>
          <img className="place-card__image" src={previewImage} width={previewSize.width} height={previewSize.height} alt="Place"/>
        </Link>
      </div>
      <div className={`${pathname === AppRoute.FAVORITES ? 'favorites__card-info' : ''} place-card__info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={`place-card__bookmark-button button ${isFavorite ? 'place-card__bookmark-button--active' : ''}`} type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"/>
            </svg>
            <span className="visually-hidden">{isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${getWidthByRating(rating)}%`}}/>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${generatePath(AppRoute.OFFER,{id})}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{ OfferType[type] }</p>
      </div>
    </article>
  );
}

export default OfferCard;
