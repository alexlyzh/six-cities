import {render} from '@testing-library/react';
import LoadingScreen from './loading-screen';

describe('Component: LoadingScreen', () => {
  it('should render correctly', () => {
    const queries = render(<LoadingScreen/>);

    expect(queries.getByText(/Loading/i)).toBeInTheDocument();
  });
});
