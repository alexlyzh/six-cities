import {useState} from 'react';
import {ActionCreator} from '../../store/actions';
import {SortType} from '../../constants';
import {useDispatch, useSelector} from 'react-redux';
import {getCurrentSort} from '../../store/reducer/app/selectors';

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
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0}
        onClick={() => setIsOpen(!isOpen)}
      >
        {currentSort}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"/>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isOpen ? 'places__options--opened' : ''}`}>

        {sortTypes.map((sortType) => (
          <li
            key={sortType}
            className={`places__option ${currentSort === SortType[sortType] ? 'places__option--active' : ''}`}
            onClick={() => onSortOptionClick(SortType[sortType])}
            tabIndex={0}
          >{SortType[sortType]}
          </li>
        ))}

      </ul>
    </form>
  );
}

export default SortForm;
