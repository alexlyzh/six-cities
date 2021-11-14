import {render} from '@testing-library/react';
import LoadingComponent from './loading-component';

describe('Component: LoadingComponent', () => {
  it('should render correctly', () => {
    const {getByTestId} = render(<LoadingComponent/>);
    expect(getByTestId('spinner')).toBeInTheDocument();
  });
});

