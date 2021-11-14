import {render, screen} from '@testing-library/react';
import {Router, Switch, Route} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import NotFoundPage from './not-found-page';
import userEvent from '@testing-library/user-event';
import {AppRoute} from '../../constants';

const history = createMemoryHistory();

describe('Component: NotFoundPage', () => {
  beforeEach(() => history.push('/bad-path'));

  it('should render correctly', () => {
    const queries = render(
      <Router history={history}>
        <NotFoundPage/>
      </Router>,
    );

    const headerElement = queries.getByText(/Page not found/i);
    const linkElement = queries.getByRole('link');

    expect(headerElement).toBeInTheDocument();
    expect(linkElement).toBeInTheDocument();
  });

  it('should redirect to ROOT when user clicked the link', () => {
    render(
      <Router history={history}>
        <Switch>
          <Route exact path={AppRoute.ROOT}>
            <h1>This is main page</h1>
          </Route>
          <Route>
            <NotFoundPage/>
          </Route>
        </Switch>
      </Router>);

    expect(screen.queryByText(/This is main page/i)).not.toBeInTheDocument();
    userEvent.click(screen.getByRole('link'));
    expect(screen.queryByText(/This is main page/i)).toBeInTheDocument();
  });
});
