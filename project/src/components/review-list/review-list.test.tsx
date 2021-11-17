import {AuthorizationStatus, FAKE_ID, MAX_COMMENTS_COUNT} from '../../constants';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {getReview} from '../../utils/mock';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import ReviewList from './review-list';

const FAKE_REVIEWS_ARRAY_LENGTH = 15;
const reviews = new Array(FAKE_REVIEWS_ARRAY_LENGTH).fill(null).map(getReview);

const history = createMemoryHistory();

const mockStore = configureMockStore();
const store = mockStore({
  USER: {
    authorizationStatus: AuthorizationStatus.AUTH,
  },
  DATA: {
    reviews: {
      [FAKE_ID]: {
        requestStatus: 'SUCCESS',
        data: reviews,
      },
    },
  },
});

describe('Component: ReviewList', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <ReviewList reviews={reviews}/>
        </Router>
      </Provider>);

    const reviewComponents = screen.getAllByTestId('review-component');

    expect(reviewComponents.length).toEqual(Math.min(reviews.length, MAX_COMMENTS_COUNT));
    expect(reviewComponents.length).toBeLessThanOrEqual(MAX_COMMENTS_COUNT);
  });
});
