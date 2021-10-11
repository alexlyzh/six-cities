//import {useState} from 'react';
import OfferCard from '../offer-card/offer-card';
import {Offers} from '../../types/offers';

type OffersListProps = {
  offers: Offers,
}

function OffersList({ offers }: OffersListProps): JSX.Element {
  //const [focusedOffer, setFocusedOffer] = useState(null);

  return (
    <>
      {
        offers.map((offer) => {
          const {id, previewImage, isFavorite, isPremium, price, title, type, rating } = offer;

          return (
            <OfferCard
              key={id}
              id={id}
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
