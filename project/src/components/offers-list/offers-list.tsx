import OfferCard from '../offer-card/offer-card';
import {Offer} from '../../types/offers';
import {OfferCardStyleByPageName} from '../../constants';

type OffersListProps = {
  offers: Offer[],
  pageName: string,
  onOfferHover?: (id: number) => void;
}

function OffersList(props: OffersListProps): JSX.Element {
  const { offers, pageName, onOfferHover } = props;
  const {className, imageClassName, infoClassName, imageWidth, imageHeight} = OfferCardStyleByPageName[pageName];

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
          onOfferHover={onOfferHover}
        />))}
    </>);
}

export {OffersList};
