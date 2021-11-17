import {SortType} from '../../constants';

type SortOptionProps = {
  className: string,
  sortType: string,
  clickHandler: () => void,
}

function SortOption({className, sortType, clickHandler}: SortOptionProps): JSX.Element {
  return (
    <li
      key={sortType}
      className={className}
      onClick={clickHandler}
      tabIndex={0}
      data-testid="sort-option"
    >
      {SortType[sortType]}
    </li>
  );
}

export {SortOption};
