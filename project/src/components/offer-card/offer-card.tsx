import {generatePath, Link} from 'react-router-dom';
import {Offer} from '../../types/types';
import {AppRoute, OfferType} from '../../constants';
import {getWidthByRating} from '../../utils/utils';
import {FavoriteButton} from '../favorite-button/favorite-button';

type OfferCardProps = {
  offer: Offer,
  className: string,
  imageClassName: string,
  infoClassName?: string,
  imageWidth: number,
  imageHeight: number,
  onChangeHighlightedOffer?: (id: number | null) => void,
}

function OfferCard(props: OfferCardProps): JSX.Element {
  const { id, previewImage, isFavorite, isPremium, price, title, type, rating } = props.offer;
  const { className, imageClassName, infoClassName, imageWidth, imageHeight, onChangeHighlightedOffer } = props;

  return (
    <article
      className={`${className} place-card`}
      data-testid="offer-card"
      onMouseEnter={() => onChangeHighlightedOffer && onChangeHighlightedOffer(id)}
      onMouseLeave={() => onChangeHighlightedOffer && onChangeHighlightedOffer(null)}
    >
      {isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>}

      <div className={`${imageClassName} place-card__image-wrapper`}>
        <Link to={generatePath(AppRoute.OFFER,{id})}>
          <img className="place-card__image" src={previewImage} width={imageWidth} height={imageHeight} alt="Place"/>
        </Link>
      </div>
      <div className={`${infoClassName} place-card__info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value" data-testid="offer-card-price">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <FavoriteButton
            id={id}
            isFavorite={isFavorite}
            buttonClassName="place-card__bookmark-button"
            iconClassName="place-card__bookmark-icon"
            iconWidth={18}
            iconHeight={19}
          />
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${getWidthByRating(rating)}%`}}/>
            <span className="visually-hidden" data-testid="offer-card-rating">Rating {rating}</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={generatePath(AppRoute.OFFER,{id})}>{title}</Link>
        </h2>
        <p className="place-card__type">{ OfferType[type] }</p>
      </div>
    </article>
  );
}

export default OfferCard;
