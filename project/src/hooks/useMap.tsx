import {useEffect, MutableRefObject, useState} from 'react';
import {LeafletEvent, Map, TileLayer} from 'leaflet';
import {City} from '../types/types';

const LayerSettings = {
  URL_TEMPLATE: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
  ATTRIBUTION: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
};

const onMapMouseout = (evt: LeafletEvent) => evt.target.scrollWheelZoom.disable();
const onMapMousedown = (evt: LeafletEvent) => evt.target.scrollWheelZoom.enable();

function useMap(
  mapRef: MutableRefObject<HTMLElement | null>,
  city: City,
): Map | null {
  const [map, setMap] = useState<Map | null>(null);

  useEffect(() => {
    let instance: Map;

    if (mapRef.current !== null && map === null) {
      instance = new Map(mapRef.current, {
        center: {
          lat: city.location.latitude,
          lng: city.location.longitude,
        },
        zoom: city.location.zoom,
        scrollWheelZoom: false,
      });

      instance.addEventListener('mousedown', onMapMousedown);
      instance.addEventListener('mouseout', onMapMouseout);

      const layer = new TileLayer(LayerSettings.URL_TEMPLATE,{ attribution: LayerSettings.ATTRIBUTION });

      instance.addLayer(layer);

      setMap(instance);
    }
  }, [mapRef, map, city]);

  return map;
}

export default useMap;
