import {ReviewComponent} from './review-component';
import {render, screen} from '@testing-library/react';
import {getReview} from '../../utils/mock';
import {formatToFullMonthYear} from '../../utils/utils';

const review = getReview();

describe('Component: ReviewList', () => {
  it('should render correctly', () => {
    render(<ReviewComponent review={review}/>);

    expect(screen.getByAltText('Reviews avatar')).toBeInTheDocument();
    expect(screen.getByText(review.user.name)).toBeInTheDocument();
    expect(screen.getByText(review.comment)).toBeInTheDocument();
    expect(screen.getByText(`Rating ${review.rating}`)).toBeInTheDocument();
    expect(screen.getByText(formatToFullMonthYear(review.date))).toBeInTheDocument();
  });
});


