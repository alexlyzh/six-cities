import {Route, Redirect, RouteProps} from 'react-router-dom';
import {AuthorizationStatus, AppRoute} from '../../constants';
import {State} from '../../store/reducer/root-reducer';
import {connect, ConnectedProps} from 'react-redux';
import {getAuthStatus} from '../../store/reducer/user/selectors';

interface PrivateRouteProps extends RouteProps {
  render: () => JSX.Element,
}

const mapStateToProps = (state: State) => ({
  authorizationStatus: getAuthStatus(state),
});

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PrivateRouteProps & PropsFromRedux;

function PrivateRoute (props: ConnectedComponentProps): JSX.Element {
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

export default connector(PrivateRoute);
