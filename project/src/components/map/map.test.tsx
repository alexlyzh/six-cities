import {render} from '@testing-library/react';
import {screen} from '@testing-library/react';
import Map from './map';
import * as Mock from '../../utils/mock';

const MAP_FAKE_CLASSNAME = '';
const city = Mock.getCity();
const offers = [Mock.getOffer()];

describe('Component: Map', () => {
  it('should render correctly', () => {
    render (
      <Map
        city={city}
        offers={offers}
        className={MAP_FAKE_CLASSNAME}
      />);

    expect(screen.getByTestId('map')).toBeInTheDocument();
  });
});
