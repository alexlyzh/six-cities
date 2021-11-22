import Header from '../header/header';
import {useDispatch} from 'react-redux';
import {ActionsAPI} from '../../store/api-actions';
import {ChangeEvent, FormEvent, useMemo, useState} from 'react';
import {LoginLocation} from '../login-location/login-location';
import {getRandomCityName} from '../../utils/utils';
import {ActionCreator} from '../../store/actions';

const checkPasswordValidity = ({target}: ChangeEvent<HTMLInputElement>) => {
  let validity = '';

  switch (true) {
    case /\s/g.test(target.value):
      validity = 'Enter a password without spaces';
      break;
    case !(/(?=.*[A-Za-z])(?=.*[0-9])[A-Za-z0-9]+/.test(target.value)):
      validity = 'Enter at least one letter and one digit';
      break;
  }

  target.setCustomValidity(validity);
  target.reportValidity();
};

function LoginPage(): JSX.Element {
  const [authData, setAuthData] = useState({email: '', password: ''});
  const dispatch = useDispatch();

  const randomCityName = useMemo(() => getRandomCityName(), []);

  const handleInputChange = ({target}: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = target;
    setAuthData({
      ...authData,
      [name]: value,
    });
  };

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(ActionsAPI.login(authData));
  };

  const handleLoginLocationLinkClick = () => dispatch(ActionCreator.changeCity(randomCityName));

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
                <input
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  value={authData.email}
                  onChange={handleInputChange}
                  data-testid="email"
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  value={authData.password}
                  onChange={(evt) =>{
                    checkPasswordValidity(evt);
                    handleInputChange(evt);
                  }}
                  data-testid="password"
                />
              </div>
              <button className="login__submit form__submit button" type="submit" data-testid="sign-in">Sign in</button>
            </form>
          </section>

          <LoginLocation
            onLinkClick={handleLoginLocationLinkClick}
            randomCityName={randomCityName}
          />

        </div>
      </main>
    </div>
  );
}

export default LoginPage;
