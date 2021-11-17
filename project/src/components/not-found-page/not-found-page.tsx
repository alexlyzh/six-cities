import {Link} from 'react-router-dom';
import {AppRoute} from '../../constants';
import './not-found-page.css';

function NotFoundPage(): JSX.Element {
  return (
    <div className="not-found">
      <h1>
        404.
        <br/>
        <small>Page not found</small>
      </h1>

      <Link className="link-to-main" to={AppRoute.ROOT}>
        Go to main page
      </Link>
    </div>
  );
}

export default NotFoundPage;
