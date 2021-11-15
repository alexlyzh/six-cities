import {render, screen} from '@testing-library/react';
import MainEmpty from './main-empty';
import {INITIAL_CITY_NAME} from '../../constants';

describe('Component: MainEmpty', () => {
  it('should render correctly', () => {
    render(<MainEmpty city={INITIAL_CITY_NAME}/>);
    expect(screen.getByTestId('main-empty')).toBeInTheDocument();
  });
});
