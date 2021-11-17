import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import {SortType} from '../../constants';
import {render, screen} from '@testing-library/react';
import SortForm from './sort-form';
import userEvent from '@testing-library/user-event';

const mockStore = configureMockStore();
const store = mockStore({
  APP: {
    currentSort: SortType.TOP_RATED,
  },
});

const form = (
  <Provider store={store}>
    <SortForm/>
  </Provider>);

describe('Component: SortForm', () => {
  it('should render correctly', () => {
    render(form);

    expect(screen.getByTestId('sort-type').textContent).toEqual(SortType.TOP_RATED);
  });

  it('should open/close sort option list after click on current sort type', () => {
    render(form);

    expect(screen.getByTestId('sort-option-list')).not.toHaveClass('places__options--opened');

    userEvent.click(screen.getByTestId('sort-type'));
    expect(screen.getByTestId('sort-option-list')).toHaveClass('places__options--opened');

    userEvent.click(screen.getByTestId('sort-type'));
    expect(screen.getByTestId('sort-option-list')).not.toHaveClass('places__options--opened');
  });
});
