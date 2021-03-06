import {Link} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../constants';
import {useDispatch, useSelector} from 'react-redux';
import {getAuthStatus, getUser} from '../../store/reducer/user/selectors';
import {Logo} from '../logo/logo';
import {SignOut} from '../sign-out/sign-out';
import {ActionsAPI} from '../../store/api-actions';
import {MouseEvent} from 'react';

type HeaderProps = {
  isLoginPage?: boolean,
}

function Header({isLoginPage}: HeaderProps): JSX.Element {
  const authorizationStatus = useSelector(getAuthStatus);
  const user = useSelector(getUser);
  const dispatch = useDispatch();

  const handleSignOut = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    dispatch(ActionsAPI.logout());
  };

  return (
    <header className="header" data-testid="header-component">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left" data-testid="header-logo">
            <Logo className={'header__logo'} imageWidth={81} imageHeight={41}/>
          </div>
          <nav className="header__nav">
            {isLoginPage ? null :
              <ul className="header__nav-list">
                {authorizationStatus === AuthorizationStatus.AUTH ?
                  <>
                    <li className="header__nav-item user">
                      <Link
                        to={AppRoute.FAVORITES}
                        className="header__nav-link header__nav-link--profile"
                        data-testid="header-redirect-link"
                      >
                        <div
                          className="header__avatar-wrapper user__avatar-wrapper"
                          style={{width: '30px', height: '30px'}}
                        >
                          <img
                            src={user?.avatarUrl}
                            style={{borderRadius: '50%'}}
                            alt="User avatar"
                          />
                        </div>
                        <span className="header__user-name user__name" data-testid="header-email">{user?.email}</span>
                      </Link>
                    </li>
                    <li className="header__nav-item">
                      <SignOut onSignOutClick={handleSignOut}/>
                    </li>
                  </> :

                  <li className="header__nav-item user">
                    <Link
                      to={AppRoute.LOGIN}
                      className="header__nav-link header__nav-link--profile"
                      data-testid="header-redirect-link"
                    >
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                      </div>
                      <span className="header__login">Sign in</span>
                    </Link>
                  </li>}

              </ul>}
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
