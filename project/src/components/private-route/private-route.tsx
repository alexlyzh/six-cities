import {Route, Redirect, RouteProps} from 'react-router-dom';
import {AuthorizationStatus, AppRoute} from '../../constants';

interface PrivateRouteProps extends RouteProps {
  render: () => JSX.Element,
  authorizationStatus: AuthorizationStatus,
}

function PrivateRoute (props: PrivateRouteProps) {
  const {exact, path, render, authorizationStatus} = props;

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
