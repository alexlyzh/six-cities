import {useState} from 'react';
import {ActionCreator} from '../../store/actions';
import {SortType} from '../../constants';
import {useDispatch, useSelector} from 'react-redux';
import {getCurrentSort} from '../../store/reducer/app/selectors';
import {SortOption} from '../sort-option/sort-option';

function SortForm(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const currentSort = useSelector(getCurrentSort);
  const dispatch = useDispatch();

  const sortTypes = Object.keys(SortType);

  const onSortOptionClick = (sortType: string): void => {
    (sortType !== currentSort) && dispatch(ActionCreator.changeSort(sortType));
    setIsOpen(false);
  };

  return (
    <form className="places__sorting" action="#" method="get" data-testid="sort-form">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type"
        tabIndex={0}
        onClick={() => setIsOpen(!isOpen)} // есть ли способ протестировать обработчик, не вынося его в переменную?
        data-testid="sort-type"
      >
        {currentSort}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"/>
        </svg>
      </span>
      <ul
        className={`places__options places__options--custom ${isOpen ? 'places__options--opened' : ''}`}
        data-testid="sort-option-list"
      >

        {sortTypes.map((sortType) => (
          <SortOption
            key={sortType}
            className={`places__option ${currentSort === SortType[sortType] ? 'places__option--active' : ''}`}
            sortType={sortType}
            onSortOptionClick={() => onSortOptionClick(SortType[sortType])}
          />
        ))}

      </ul>
    </form>
  );
}

export default SortForm;
