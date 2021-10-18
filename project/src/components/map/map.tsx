import {useRef, useEffect} from 'react';
import 'leaflet/dist/leaflet.css';
import {Icon, Marker} from 'leaflet';
import useMap from '../../hooks/useMap';
import {City, Offer} from '../../types/offers';

import {MapMarkerURL} from '../../constants';

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

  useEffect(() => {
    const markers: Marker[] = [];

    if (map) {
      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude,
        });

        markers.push(marker);

        marker
          .setIcon(
            selectedOffer && offer.id === selectedOffer.id
              ? currentCustomIcon
              : defaultCustomIcon,
          )
          .addTo(map);
      });
    }
    return () => markers.forEach((marker) => marker.remove());
  }, [map, offers, selectedOffer]);

  return (
    <section className={`${className} map`}>
      <div style={{height: '100%'}} ref={mapRef}/>
    </section>
  );
}

export default Map;
