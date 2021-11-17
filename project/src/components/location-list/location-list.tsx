import {useDispatch} from 'react-redux';
import {ActionCreator} from '../../store/actions';

type LocationListProps = {
  cityNames: string[],
  selectedCity: string,
};

function LocationList({cityNames, selectedCity}: LocationListProps): JSX.Element {
  const dispatch = useDispatch();

  return (
    <section className="locations container" data-testid="locations">
      <ul className="locations__list tabs__list">
        {cityNames.map((cityName) => (
          <li className="locations__item" key={cityName}>
            <a className={`locations__item-link tabs__item ${selectedCity === cityName ? 'tabs__item--active' : ''}`} href="#"
              onClick={(evt) => {
                evt.preventDefault();
                dispatch(ActionCreator.changeCity(cityName));
              }}
            >
              <span>{cityName}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default LocationList;
