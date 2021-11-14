import {render} from '@testing-library/react';
import FavoritesEmpty from './favorites-empty';

describe('Component: FavoritesEmpty', () => {
  it('should render correctly', () => {
    const queries = render(<FavoritesEmpty/>);

    expect(queries.getByText(/Nothing yet saved/i)).toBeInTheDocument();
  });
});
