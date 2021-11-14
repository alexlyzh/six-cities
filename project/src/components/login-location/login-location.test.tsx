import {LoginLocation} from './login-location';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {INITIAL_CITY_NAME} from '../../constants';

const history = createMemoryHistory();

describe('Component: LoginLocation', () => {
  it('should call click handler', () => {
    const onLinkClick = jest.fn();

    render(
      <Router history={history}>
        <LoginLocation
          onLinkClick={onLinkClick}
          randomCityName={INITIAL_CITY_NAME}
        />
      </Router>
    );

    const redirectLinkElement = screen.getByTestId('redirect');

    expect(redirectLinkElement).toBeInTheDocument();

    userEvent.click(redirectLinkElement);

    expect(onLinkClick).toBeCalled();
  });
});
