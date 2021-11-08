import {useEffect, MutableRefObject, useRef} from 'react';
import {LeafletEvent, Map, TileLayer} from 'leaflet';
import {City} from '../types/types';

const LayerSettings = {
  URL_TEMPLATE: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
  ATTRIBUTION: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
};

const onMapMouseout = (evt: LeafletEvent) => evt.target.scrollWheelZoom.disable();
const onMapClick = (evt: LeafletEvent) => evt.target.scrollWheelZoom.enable();

function useMap(
  mapRef: MutableRefObject<HTMLElement | null>,
  city: City,
): Map | null {
  const map = useRef<Map | null>(null);

  useEffect(() => {
    let instance: Map;

    if (mapRef.current !== null && map.current === null) {
      instance = new Map(mapRef.current, {
        center: {
          lat: city.location.latitude,
          lng: city.location.longitude,
        },
        zoom: city.location.zoom,
        scrollWheelZoom: false,
      });

      instance.addEventListener('click', onMapClick);
      instance.addEventListener('mouseout', onMapMouseout);

      const layer = new TileLayer(LayerSettings.URL_TEMPLATE,{ attribution: LayerSettings.ATTRIBUTION });

      instance.addLayer(layer);

      map.current = instance;
    }

    return () => {
      instance?.removeEventListener('click', onMapClick);
      instance?.removeEventListener('mouseout', onMapMouseout);
    };
  }, [mapRef, map, city]);

  return map.current;
}

export default useMap;
