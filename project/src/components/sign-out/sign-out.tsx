import {MouseEvent} from 'react';

type SignOutProps = {
  onSignOutClick: (evt: MouseEvent<HTMLAnchorElement>) => void,
}

function SignOut({onSignOutClick}: SignOutProps): JSX.Element {

  return (
    <a
      className="header__nav-link"
      href="#"
      onClick={onSignOutClick}
      data-testid="sign-out"
    >
      <span className="header__signout">Sign out</span>
    </a>
  );
}

export {SignOut};
