import {Link} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../constants';
import {State} from '../../store/reducer/root-reducer';
import {connect, ConnectedProps} from 'react-redux';
import {bindActionCreators} from '@reduxjs/toolkit';
import {ThunkAppDispatch} from '../../store/actions';
import {logoutAction} from '../../store/api-actions';

type HeaderProps = {
  isLoginPage?: boolean,
}

const mapStateToProps = ({USER}: State) => ({
  authorizationStatus: USER.authorizationStatus,
  user: USER.user,
});

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => bindActionCreators({
  onLogoutClick: logoutAction,
}, dispatch);

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = HeaderProps & PropsFromRedux;

function Header({authorizationStatus, isLoginPage, onLogoutClick, user}: ConnectedComponentProps): JSX.Element {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link to={AppRoute.ROOT} className="header__logo-link header__logo-link--active">
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
            </Link>
          </div>
          <nav className="header__nav">
            {isLoginPage ? null :
              <ul className="header__nav-list">
                {authorizationStatus === AuthorizationStatus.AUTH ?
                  <>
                    <li className="header__nav-item user">
                      <Link to={AppRoute.FAVORITES} className="header__nav-link header__nav-link--profile">
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
                        <span className="header__user-name user__name">{user?.email}</span>
                      </Link>
                    </li>
                    <li className="header__nav-item">
                      <a className="header__nav-link" href="#"
                        onClick={(evt) => {
                          evt.preventDefault();
                          onLogoutClick();
                        }}
                      >
                        <span className="header__signout">Sign out</span>
                      </a>
                    </li>
                  </> :

                  <li className="header__nav-item user">
                    <Link to={AppRoute.LOGIN} className="header__nav-link header__nav-link--profile">
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

export default connector(Header);
