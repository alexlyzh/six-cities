import {render, screen} from '@testing-library/react';
import {Logo} from './logo';
import {createMemoryHistory} from 'history';
import {Router, Switch, Route} from 'react-router-dom';
import {AppRoute} from '../../constants';
import userEvent from '@testing-library/user-event';

const FakeProps = {
  className: '',
  imageWidth: 20,
  imageHeight: 20,
} as const;

const history = createMemoryHistory();


describe('Component: Logo', () => {
  it('should redirect to "ROOT" when clicked', () => {
    history.push('/fake-route');

    render(
      <Router history={history}>
        <Switch>
          <Route exact path={AppRoute.ROOT}>
            <h1>Main page</h1>
          </Route>
          <Route>
            <Logo
              className={FakeProps.className}
              imageWidth={FakeProps.imageWidth}
              imageHeight={FakeProps.imageHeight}
            />
          </Route>
        </Switch>
      </Router>);

    expect(screen.queryByText('Main page')).not.toBeInTheDocument();

    userEvent.click(screen.getByRole('link'));

    expect(screen.getByText('Main page')).toBeInTheDocument();
  });
});
