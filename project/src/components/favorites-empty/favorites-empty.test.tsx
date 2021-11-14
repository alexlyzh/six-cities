import {render, screen} from '@testing-library/react';
import FavoritesEmpty from './favorites-empty';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {FAKE_ARRAY_LENGTH} from '../../constants';
import * as Mock from '../../utils/mock';

const mockStore = configureMockStore();
const store = mockStore({
  DATA: {
    favorites: {
      requestStatus: 'SUCCESS',
      data: new Array(FAKE_ARRAY_LENGTH).fill(null).map(Mock.getOffer),
    },
  },
});

describe('Component: FavoritesEmpty', () => {
  it('should not render without favorites', () => {
    const isFavorites = store.getState().DATA.favorites.data.length;

    if (!isFavorites) {
      render(<FavoritesEmpty/>);
    }

    expect(screen.queryByText(/Nothing yet saved/i)).not.toBeInTheDocument();
  });

  it('should render if there are favorites', () => {
    const isFavorites = store.getState().DATA.favorites.data.length;

    if (isFavorites) {
      render(<FavoritesEmpty/>);
    }

    expect(screen.queryByText(/Nothing yet saved/i)).toBeInTheDocument();
  });
});
