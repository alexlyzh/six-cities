import {Review} from '../../types/types';
import {ReviewComponent} from '../review-component/review-component';
import {MAX_COMMENTS_COUNT} from '../../constants';

type ReviewListProps = {
  reviews: Review[],
}

function ReviewList({reviews}: ReviewListProps): JSX.Element {
  const reviewsCopy = [...reviews]
    .sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
    .slice(0, MAX_COMMENTS_COUNT);

  return (
    <section className="property__reviews reviews" data-testid="reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
      <ul className="reviews__list">
        {reviewsCopy.map((review) => (
          <ReviewComponent
            key={review.id}
            review={review}
          />
        ))}
      </ul>
    </section>);
}

export default ReviewList;
