import {useState} from 'react';
import {Offer} from '../../types/types';

type HookReturn = [
  Offer | undefined,
  (id: number | null) => void,
]

const useHighlightedOffer = (offers: Offer[]): HookReturn => {
  const [highlightedOffer, setHighlightedOffer] = useState<Offer | undefined>(undefined);

  const onChangeHighlightedOffer = (id: number | null): void => {
    const currentPoint = offers.find((offer) => offer.id === id);
    setHighlightedOffer(currentPoint);
  };

  return [highlightedOffer, onChangeHighlightedOffer];
};

export default useHighlightedOffer;
