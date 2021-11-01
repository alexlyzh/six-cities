import {useState} from 'react';
import {Offer} from '../types/types';

const useHighlightedOffer = (offers: Offer[]): [Offer | undefined, (id: number | null) => void] => {
  const [highlightedOffer, setHighlightedOffer] = useState<Offer | undefined>(undefined);

  const onChangeHighlightedOffer = (id: number | null): void => {
    const currentPoint = offers.find((offer) => offer.id === id);
    setHighlightedOffer(currentPoint);
  };

  return [highlightedOffer, onChangeHighlightedOffer];
};

export default useHighlightedOffer;
