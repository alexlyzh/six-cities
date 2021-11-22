import {render, screen} from '@testing-library/react';
import {SortOption} from './sort-option';
import {SortType} from '../../constants';
import userEvent from '@testing-library/user-event';

describe('Component: SortOption', () => {
  it('should call click handler on click', () => {
    const onSortOptionClick = jest.fn();

    render(
      <SortOption
        className={'some'}
        sortType={SortType.POPULAR}
        onSortOptionClick={onSortOptionClick}
      />);

    userEvent.click(screen.getByTestId('sort-option'));

    expect(onSortOptionClick).toBeCalledTimes(1);
  });
});
