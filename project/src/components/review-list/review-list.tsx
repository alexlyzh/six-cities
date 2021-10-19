import {Comment} from '../../types/comments';
import Review from '../review/review';

type ReviewListProps = {
  comments: Comment[],
}

function ReviewList({comments}: ReviewListProps): JSX.Element {
  comments = comments
    .sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
    .slice(0, 10);

  return (
    <>
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{comments.length}</span></h2>
      <ul className="reviews__list">
        {comments.map((comment) => (
          <Review
            key={comment.id}
            comment={comment}
          />
        ))}
      </ul>
    </>);
}

export default ReviewList;
