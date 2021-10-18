import {useState} from 'react';
import {Offer} from '../types/offers';

const useSelectedOffer = (offers: Offer[]): [Offer | undefined, (id: number | null) => void] => {
  const [selectedOffer, setSelectedOffer] = useState<Offer | undefined>(undefined);

  const onChangeSelectedOffer = (id: number | null): void => {
    const currentPoint = offers.find((offer) => offer.id === id);
    setSelectedOffer(currentPoint);
  };

  return [selectedOffer, onChangeSelectedOffer];
};

export default useSelectedOffer;
