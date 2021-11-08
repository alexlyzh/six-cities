import {useRef, useEffect} from 'react';
import 'leaflet/dist/leaflet.css';
import {Icon, Map as LeafletMap, TileLayer, Marker, LeafletEvent} from 'leaflet';
import {City, Offer} from '../../types/types';

import {AppRoute, MapMarkerURL} from '../../constants';
import {generatePath, useHistory} from 'react-router-dom';

type MapProps = {
  city: City,
  offers: Offer[],
  highlightedOffer?: Offer | undefined,
  className: string,
};

const defaultCustomIcon = new Icon({
  iconUrl: MapMarkerURL.DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const currentCustomIcon = new Icon({
  iconUrl: MapMarkerURL.CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const disableZoom = (evt: LeafletEvent) => evt.target.scrollWheelZoom.disable();
const enableZoom = (evt: LeafletEvent) => evt.target.scrollWheelZoom.enable();

const LayerSettings = {
  URL_TEMPLATE: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
  ATTRIBUTION: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
};

function Map(props: MapProps): JSX.Element {
  const {city, offers, highlightedOffer, className} = props;
  const mapRef = useRef(null);
  const map = useRef<LeafletMap | null>(null);
  const history = useHistory();

  useEffect(() => {
    if (mapRef.current !== null && map.current === null) {
      map.current = new LeafletMap(mapRef.current, {
        center: {
          lat: city.location.latitude,
          lng: city.location.longitude,
        },
        zoom: city.location.zoom,
        scrollWheelZoom: false,
      });

      map.current.addEventListener('click', enableZoom);
      map.current.addEventListener('mouseout', disableZoom);

      const layer = new TileLayer(LayerSettings.URL_TEMPLATE,{ attribution: LayerSettings.ATTRIBUTION });

      map.current.addLayer(layer);
    }

    return () => {
      if (map.current) {
        map.current.removeEventListener('click', enableZoom);
        map.current.removeEventListener('mouseout', disableZoom);
      }
    };
  }, [mapRef, map, city]);

  useEffect(() => {
    const markers: Marker[] = [];
    const mapCurrent = map.current;

    if (mapCurrent) {
      offers.forEach((offer) => {
        const {id, location} = offer;
        const marker = new Marker({
          lat: location.latitude,
          lng: location.longitude,
        });

        marker.on('click', () => history.push(generatePath(AppRoute.OFFER, {id})));
        markers.push(marker);

        marker
          .setIcon(
            offer.id === highlightedOffer?.id
              ? currentCustomIcon
              : defaultCustomIcon,
          )
          .addTo(mapCurrent);
      });
    }
    return () => markers.forEach((marker) => marker.remove());
  }, [map, offers, highlightedOffer, history]);

  useEffect(() => {
    const {location} = city;
    map.current?.setView([location.latitude, location.longitude]);
  });

  return (
    <section className={`${className} map`}>
      <div style={{height: '100%'}} ref={mapRef}/>
    </section>
  );
}

export default Map;
