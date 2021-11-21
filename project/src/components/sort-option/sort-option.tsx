import {SortType} from '../../constants';

type SortOptionProps = {
  className: string,
  sortType: string,
  onSortOptionClick: () => void,
}

function SortOption({className, sortType, onSortOptionClick}: SortOptionProps): JSX.Element {
  return (
    <li
      key={sortType}
      className={className}
      onClick={onSortOptionClick}
      tabIndex={0}
      data-testid="sort-option"
    >
      {SortType[sortType]}
    </li>
  );
}

export {SortOption};
