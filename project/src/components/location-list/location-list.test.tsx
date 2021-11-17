import {render, screen} from '@testing-library/react';
import LocationList from './location-list';
import {CityGeoData, INITIAL_CITY_NAME} from '../../constants';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';

const mockStore = configureMockStore();
const store = mockStore();

describe('Component: LocationList', () => {
  it('should render correctly', () => {
    const cities = Object.keys(CityGeoData);

    render(
      <Provider store={store}>
        <LocationList cityNames={cities} selectedCity={INITIAL_CITY_NAME}/>
      </Provider>);

    expect(screen.queryByTestId('locations')).toBeInTheDocument();
  });
});
