import OfferCard from '../offer-card/offer-card';
import {Offer} from '../../types/offers';

type OffersListProps = {
  offers: Offer[],
  className: string,
  imageClassName: string,
  infoClassName?: string,
  imageWidth: number,
  imageHeight: number,
  onChangeHighlightedOffer?: (id: number | null) => void,
}

function OffersList(props: OffersListProps): JSX.Element {
  const { offers, className, imageClassName, infoClassName, imageWidth, imageHeight, onChangeHighlightedOffer } = props;

  return (
    <>
      {offers.map((offer) => (
        <OfferCard
          key={offer.id}
          offer={offer}
          className={className}
          imageClassName={imageClassName}
          infoClassName={infoClassName}
          imageHeight={imageHeight}
          imageWidth={imageWidth}
          onChangeHighlightedOffer={onChangeHighlightedOffer}
        />))}
    </>);
}

export {OffersList};
