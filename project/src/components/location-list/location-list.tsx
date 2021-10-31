import {Dispatch} from '@reduxjs/toolkit';
import {connect, ConnectedProps} from 'react-redux';
import {State} from '../../types/state';
import {Actions, ActionCreator} from '../../store/actions';

type LocationListProps = {
  cityNames: string[],
};

const mapStateToProps = ({selectedCity}: State) => ({
  selectedCity,
});

const mapDispatchToProps = (dispatch: Dispatch<Actions>) => ({
  onCityChange(city: string) {
    dispatch(ActionCreator.changeCity(city));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = LocationListProps & PropsFromRedux;

function LocationList({cityNames, selectedCity, onCityChange}: ConnectedComponentProps) {
  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {cityNames.map((cityName) => (
          <li className="locations__item" key={cityName}>
            <a className={`locations__item-link tabs__item ${selectedCity === cityName ? 'tabs__item--active' : ''}`} href="#"
              onClick={(evt) => {
                evt.preventDefault();
                onCityChange(cityName);
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

export default connector(LocationList);
