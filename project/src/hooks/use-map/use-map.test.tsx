import {renderHook} from '@testing-library/react-hooks';
import useMap from './use-map';
import {useRef} from 'react';
import {getCity} from '../../utils/mock';

const city = getCity();

describe('Hook: useMap', () => {
  it('should return "null" when mapRef is "null"', () => {
    const mapRef = renderHook(() => useRef(null)).result.current;
    const map = renderHook(() => useMap(mapRef, city)).result.current;

    expect(map).toBe(null);
  });
});
