import {ChangeEvent, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getIsSubmitting} from '../../store/reducer/app/selectors';
import {ActionsAPI} from '../../store/api-actions';

type FeedbackFormProps = {
  id: number,
}

function FeedbackForm({id}: FeedbackFormProps): JSX.Element {
  const [review, setReview] = useState({
    id,
    rating: null,
    comment: '',
  });

  const dispatch = useDispatch();
  const isSubmitting = useSelector(getIsSubmitting);

  const handleFormChange = ({target}: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = target;
    setReview({
      ...review,
      [name]: value,
    });
  };

  return (
    <form className="reviews__form form" action="#" method="post"
      style={{marginBottom: '20px'}}
      onSubmit={(evt) => {
        evt.preventDefault();
        dispatch(ActionsAPI.postReview(review, setReview));
      }}
      data-testid="feedback-form"
    >
      <label className="reviews__label form__label" htmlFor="comment">Your review</label>
      <div className="reviews__rating-form form__rating">
        <input className="form__rating-input visually-hidden" name="rating" value="5" id="5-stars" type="radio"
          onChange={handleFormChange}
          disabled={isSubmitting}
          checked={review.rating === '5'}
        />
        <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"/>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="4" id="4-stars" type="radio"
          onChange={handleFormChange}
          disabled={isSubmitting}
          checked={review.rating === '4'}
        />
        <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"/>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="3" id="3-stars" type="radio"
          onChange={handleFormChange}
          disabled={isSubmitting}
          checked={review.rating === '3'}
        />
        <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"/>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="2" id="2-stars" type="radio"
          onChange={handleFormChange}
          disabled={isSubmitting}
          checked={review.rating === '2'}
        />
        <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"/>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="1" id="1-star" type="radio"
          onChange={handleFormChange}
          disabled={isSubmitting}
          checked={review.rating === '1'}
        />
        <label htmlFor="1-star" className="reviews__rating-label form__rating-label" title="terribly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"/>
          </svg>
        </label>
      </div>
      <textarea className="reviews__textarea form__textarea" id="comment" name="comment" minLength={50} maxLength={300}
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={review.comment}
        onChange={handleFormChange}
        disabled={isSubmitting}
        data-testid="review-textarea"
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay
          with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={isSubmitting || review.rating === null || review.comment.length < 50}
        >Submit
        </button>
      </div>
    </form>
  );
}

export default FeedbackForm;
