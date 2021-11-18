import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {AuthorizationStatus} from '../../constants';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import FeedbackForm from './feedback-form';
import {FAKE_ID} from '../../constants';
import userEvent from '@testing-library/user-event';
import thunk from 'redux-thunk';
import {ActionCreator} from '../../store/actions';

const RATING_STARS_COUNT = 5;

const FAKE_REVIEW_TEXT = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';

const history = createMemoryHistory();

const mockStore = configureMockStore([thunk]);

describe('Component: FeedbackForm', () => {
  it('should render correctly when not submitting', () => {
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

  it('should unlock submitting when review meets the requirements', () => {
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

    expect(screen.getByRole('button')).toBeDisabled();

    userEvent.click(screen.getAllByRole('radio')[0]);
    userEvent.type(screen.getByTestId('review-textarea'), FAKE_REVIEW_TEXT);

    expect(screen.getByRole('button')).not.toBeDisabled();
  });

  it('should be disabled when submitting', () => {
    const store = mockStore({
      APP: {
        isSubmitting: true,
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

    const textarea = screen.getByTestId('review-textarea');

    userEvent.click(screen.getAllByRole('radio')[0]);
    userEvent.type(textarea, FAKE_REVIEW_TEXT);

    expect(screen.getByRole('button')).toBeDisabled();
    expect(textarea).toBeDisabled();
  });

  it('should dispatch setSubmittingState twice on submit', () => {
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

    userEvent.click(screen.getAllByRole('radio')[0]);
    userEvent.type(screen.getByTestId('review-textarea'), FAKE_REVIEW_TEXT);
    userEvent.click(screen.getByRole('button'));

    expect(store.getActions()).toEqual([
      ActionCreator.setSubmittingState(true),
      ActionCreator.setSubmittingState(false),
    ]);
  });
});
