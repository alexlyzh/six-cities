const FAVORITE_OFFER_CLASSNAME = 'place-card__bookmark-button--active';

const Rating = {
  MAX_RATING_PERCENT: 100,
  RATING_MULTIPLIER: 20,
};

type OfferCardProps = {
  previewImage: string,
  isPremium: boolean,
  price: number,
  title: string,
  type: string,
  isFavorite: boolean,
  rating: number,
}

const getWidthStyle = (rating: number): number => Math.min(rating * Rating.RATING_MULTIPLIER, Rating.MAX_RATING_PERCENT);

function PremiumElement(): JSX.Element {
  return (
    <div className="place-card__mark">
      <span>Premium</span>
    </div>);
}

function OfferCard(props: OfferCardProps): JSX.Element {
  const { previewImage, isFavorite, isPremium, price, title, type, rating } = props;

  return (
    <article className="cities__place-card place-card">
      {isPremium && <PremiumElement/>}

      <div className="cities__image-wrapper place-card__image-wrapper">
        <a href="#">
          <img className="place-card__image" src={previewImage} width="260" height="200" alt="Place"/>
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={`place-card__bookmark-button button ${isFavorite ? FAVORITE_OFFER_CLASSNAME : ''}`} type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"/>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${getWidthStyle(rating)}%`}}/>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <a href="#">{title}</a>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export default OfferCard;
export type {OfferCardProps};
