import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {AuthorizationStatus} from '../../constants';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import FeedbackForm from './feedback-form';
import {FAKE_ID} from '../../constants';

const RATING_STARS_COUNT = 5;

const history = createMemoryHistory();

const mockStore = configureMockStore();

describe('Component: FeedbackForm', () => {
  it('should render correctly when authorized', () => {
    const store = mockStore({
      APP: {
        isSubmitting: false,
      },
      USER: {
        authorizationStatus: AuthorizationStatus.AUTH,
      },
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <FeedbackForm id={FAKE_ID}/>
        </Router>
      </Provider>);

    const submitBtn = screen.getByRole('button');

    expect(screen.getByLabelText('Your review')).toBeInTheDocument();
    expect(screen.getAllByRole('radio').length).toEqual(RATING_STARS_COUNT);
    expect(screen.getByPlaceholderText(/Tell how was your stay/i)).toBeInTheDocument();
    expect(submitBtn).toBeInTheDocument();
    expect(submitBtn).toBeDisabled();
  });
});
