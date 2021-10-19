import {useRef, useEffect} from 'react';
import 'leaflet/dist/leaflet.css';
import {Icon, Marker} from 'leaflet';
import useMap from '../../hooks/useMap';
import {City, Offer} from '../../types/offers';

import {AppRoute, MapMarkerURL} from '../../constants';
import {generatePath, useHistory} from 'react-router-dom';

type MapProps = {
  city: City,
  offers: Offer[],
  selectedOffer?: Offer | undefined,
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

function Map(props: MapProps): JSX.Element {
  const {city, offers, selectedOffer, className} = props;
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);
  const history = useHistory();

  useEffect(() => {
    const markers: Marker[] = [];

    if (map) {
      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude,
        });

        const {id} = offer;
        marker.on('click', () => history.push(generatePath(AppRoute.OFFER, {id})));
        markers.push(marker);

        marker
          .setIcon(
            offer.id === selectedOffer?.id
              ? currentCustomIcon
              : defaultCustomIcon,
          )
          .addTo(map);
      });
    }
    return () => markers.forEach((marker) => marker.remove());
  }, [map, offers, selectedOffer, history]);

  return (
    <section className={`${className} map`}>
      <div style={{height: '100%'}} ref={mapRef}/>
    </section>
  );
}

export default Map;
