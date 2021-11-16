import {getOffer} from '../../utils/mock';
import {act, renderHook} from '@testing-library/react-hooks';
import useHighlightedOffer from './use-highlighted-offer';
import {FAKE_ID} from '../../constants';

const offers = [getOffer()];
offers[0].id = FAKE_ID;

describe('Hook: use-highlighted-offer', () => {
  it('should return an array of 3 elements', () => {
    const {result} = renderHook(() => useHighlightedOffer(offers));

    const [highlightedOffer, onChangeHighlightedOffer] = result.current;

    expect(result.current).toHaveLength(2);
    expect(highlightedOffer).toBe(undefined);
    expect(onChangeHighlightedOffer).toBeInstanceOf(Function);
  });

  it('should change state correctly', () => {
    const {result} = renderHook(() => useHighlightedOffer(offers));

    let [highlightedOffer , onChangeHighlightedOffer] = result.current;
    expect(highlightedOffer).toBe(undefined);

    act(() => onChangeHighlightedOffer(FAKE_ID));

    [highlightedOffer] = result.current;
    expect(highlightedOffer).toBeInstanceOf(Object);

    [ , onChangeHighlightedOffer] = result.current;

    act(() => onChangeHighlightedOffer(null));
    [highlightedOffer] = result.current;
    expect(highlightedOffer).toBe(undefined);
  });
});
