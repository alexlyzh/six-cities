import {Link} from 'react-router-dom';
import {AppRoute} from '../../constants';

function NotFoundPage(): JSX.Element {
  return (
    <div style={{
      textAlign: 'center',
    }}
    >
      <h1>
        404.
        <br />
        <small>Page not found</small>
      </h1>

      <Link to={AppRoute.ROOT}
        style={{
          textDecoration: 'underline',
        }}
      >
        Go to main page
      </Link>
    </div>
  );
}

export default NotFoundPage;
