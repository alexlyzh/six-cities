import {LocationTab} from '../location-tab/location-tab';

type LocationListProps = {
  cityNames: string[],
  selectedCity: string,
};

function LocationTabList({cityNames, selectedCity}: LocationListProps): JSX.Element {

  return (
    <section className="locations container" data-testid="locations">
      <ul className="locations__list tabs__list">
        {cityNames.map((cityName) => {
          const className = `locations__item-link tabs__item ${selectedCity === cityName ? 'tabs__item--active' : ''}`;

          return (
            <LocationTab
              key={cityName}
              cityName={cityName}
              className={className}
            />);
        })}
      </ul>
    </section>
  );
}

export default LocationTabList;
