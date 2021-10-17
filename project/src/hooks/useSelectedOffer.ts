import {useState} from 'react';
import {Offer} from '../types/offers';

const useSelectedOffer = (offers: Offer[]): [Offer | undefined, (id: number) => void] => {
  const [selectedOffer, setSelectedOffer] = useState<Offer | undefined>(undefined);

  const onOfferHover = (id: number): void => {
    const currentPoint = offers.find((offer) => offer.id === id);
    setSelectedOffer(currentPoint);
  };

  return [selectedOffer, onOfferHover];
};

export default useSelectedOffer;
