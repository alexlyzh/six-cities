import {SignOut} from './sign-out';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Component: SignOut', () => {
  it('should call click handler on sign-out click', () => {
    const clickHandler = jest.fn();

    render(<SignOut onSignOutClick={clickHandler}/>);

    userEvent.click(screen.getByTestId('sign-out'));

    expect(clickHandler).toBeCalled();
  });
});

