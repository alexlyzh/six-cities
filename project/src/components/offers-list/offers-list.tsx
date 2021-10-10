import OfferCard from '../offer-card/offer-card';
import {Offers} from '../../types/offers';

type OffersListProps = {
  offers: Offers,
}

function OffersList({ offers }: OffersListProps): JSX.Element {
  return (
    <>
      {
        offers.map((offer) => {
          const {id, previewImage, isFavorite, isPremium, price, title, type, rating } = offer;

          return (
            <OfferCard
              key={id}
              previewImage={previewImage}
              isPremium={isPremium}
              price={price}
              title={title}
              type={type}
              isFavorite={isFavorite}
              rating={rating}
            />);
        })
      }
    </>);
}

export {OffersList};
