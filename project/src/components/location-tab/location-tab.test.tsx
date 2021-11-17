import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import {render, screen} from '@testing-library/react';
import {LocationTab} from './location-tab';
import {INITIAL_CITY_NAME} from '../../constants';
import userEvent from '@testing-library/user-event';
import {ActionCreator} from '../../store/actions';

const FAKE_CITY_NAME = 'Hamburg';
const FAKE_CLASS_NAME = '';

const mockStore = configureMockStore();

const store = mockStore({
  APP: {
    selectedCity: INITIAL_CITY_NAME,
  },
});

describe('Component: LocationTab', () => {
  it('should dispatch Action.changeCity() when clicked', () => {
    render(
      <Provider store={store}>
        <LocationTab cityName={FAKE_CITY_NAME} className={FAKE_CLASS_NAME}/>
      </Provider>,
    );

    expect(store.getActions()).toEqual([]);

    userEvent.click(screen.getByRole('link'));

    expect(store.getActions()).toEqual([
      ActionCreator.changeCity(FAKE_CITY_NAME),
    ]);
  });
});
