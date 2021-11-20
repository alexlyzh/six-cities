import OfferCard from '../offer-card/offer-card';
import {Offer} from '../../types/types';

type OffersListProps = {
  offers: Offer[],
  nearsAnchorId?: number,
  className: string,
  imageClassName: string,
  infoClassName?: string,
  imageWidth: number,
  imageHeight: number,
  onChangeHighlightedOffer?: (id: number | null) => void,
}

function OffersList(props: OffersListProps): JSX.Element {
  const { offers, nearsAnchorId, className, imageClassName, infoClassName, imageWidth, imageHeight, onChangeHighlightedOffer } = props;

  return (
    <>
      {offers.map((offer) => (
        <OfferCard
          key={offer.id}
          offer={offer}
          nearsAnchorId={nearsAnchorId}
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
