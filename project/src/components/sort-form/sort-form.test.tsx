import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import {SortType} from '../../constants';
import {render, screen} from '@testing-library/react';
import SortForm from './sort-form';

const mockStore = configureMockStore();
const store = mockStore({
  APP: {
    currentSort: SortType.TOP_RATED,
  },
});

describe('Component: SortForm', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <SortForm/>
      </Provider>);

    expect(screen.getByTestId('sort-type').textContent).toEqual(SortType.TOP_RATED);
  });
});
