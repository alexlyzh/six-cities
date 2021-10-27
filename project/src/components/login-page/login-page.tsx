import {Link} from 'react-router-dom';
import Header from '../header/header';
import {AppRoute} from '../../constants';
import {connect, ConnectedProps} from 'react-redux';
import {ThunkAppDispatch} from '../../store/actions';
import {loginAction} from '../../store/api-actions';
import {AuthData} from '../../store/api-actions';
import {ChangeEvent, FormEvent, useState} from 'react';

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  onSubmit(authData: AuthData) {
    dispatch(loginAction(authData))
      .catch((err) => {
        throw new Error(err);
      });
  },
});

const connector = connect(null, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

function LoginPage({onSubmit}: PropsFromRedux): JSX.Element {
  const [authData, setAuthData] = useState({email: '', password: ''});

  const handleInputChange = ({target}: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = target;
    setAuthData({
      ...authData,
      [name]: value,
    });
  };

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    onSubmit(authData);
  };

  const checkPasswordValidity = ({target}: ChangeEvent<HTMLInputElement>) => {
    const validity = /\s/g.test(target.value) ? 'Enter a password without spaces' : '';
    target.setCustomValidity(validity);
    target.reportValidity();
  };

  return (
    <div className="page page--gray page--login">
      <Header isLoginPage/>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" action="#" method="post"
              onSubmit={handleFormSubmit}
            >
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input className="login__input form__input" type="email" name="email" placeholder="Email" required
                  value={authData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input className="login__input form__input" type="password" name="password" placeholder="Password" required
                  value={authData.password}
                  onChange={(evt) =>{
                    checkPasswordValidity(evt);
                    handleInputChange(evt);
                  }}
                />
              </div>
              <button className="login__submit form__submit button" type="submit">Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link to={AppRoute.ROOT} className="locations__item-link">
                <span>Amsterdam</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default connector(LoginPage);
