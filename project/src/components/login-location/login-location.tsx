import {Link} from 'react-router-dom';
import {AppRoute} from '../../constants';

type LoginLocationProps = {
  onLinkClick: () => void,
  randomCityName: string,
}

function LoginLocation({onLinkClick, randomCityName}: LoginLocationProps): JSX.Element {
  return (
    <section className="locations locations--login locations--current">
      <div className="locations__item">
        <Link
          to={AppRoute.ROOT}
          onClick={onLinkClick}
          className="locations__item-link"
          data-testid="redirect-root"
          data-city={randomCityName}
        >
          <span>{randomCityName}</span>
        </Link>
      </div>
    </section>
  );
}

export {LoginLocation};
