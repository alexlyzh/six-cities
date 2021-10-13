import OfferCard from '../offer-card/offer-card';
import {Offer} from '../../types/offers';

type OffersListProps = {
  offers: Offer[],
}

function OffersList(props: OffersListProps): JSX.Element {
  return (
    <>
      {props.offers.map((offer) => (
        <OfferCard
          key={offer.id}
          offer={offer}
        />))}
    </>);
}

export {OffersList};
