import {Route, Redirect, RouteProps} from 'react-router-dom';
import {AuthorizationStatus, AppRoute} from '../../constants';
import {useSelector} from 'react-redux';
import {getAuthStatus} from '../../store/reducer/user/selectors';

interface PrivateRouteProps extends RouteProps {
  render: () => JSX.Element,
}

function PrivateRoute (props: PrivateRouteProps): JSX.Element {
  const {exact, path, render} = props;
  const authorizationStatus = useSelector(getAuthStatus);

  return (
    <Route
      exact={exact}
      path={path}
      render={() => (
        authorizationStatus === AuthorizationStatus.AUTH ? render() : <Redirect to={AppRoute.LOGIN}/>
      )}
    />
  );
}

export default PrivateRoute;
