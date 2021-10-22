import {useState} from 'react';
import {State} from '../../types/state';
import {Dispatch} from '@reduxjs/toolkit';
import {Actions} from '../../types/action';
import {changeSort} from '../../store/actions/actions';
import {SortType} from '../../constants';
import {connect, ConnectedProps} from 'react-redux';

const mapStateToProps = ({currentSort}: State) => ({
  currentSort,
});

const mapDispatchToProps = (dispatch: Dispatch<Actions>) => ({
  onSortChange(sortType: string) {
    dispatch(changeSort(sortType));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

function SortForm({currentSort, onSortChange}: PropsFromRedux): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);

  const onSortOptionClick = (sortType: string): void => {
    (sortType !== currentSort) && onSortChange(sortType);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0}
        onClick={() => setIsOpen(!isOpen)}
      >
        Popular
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"/>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isOpen ? 'places__options--opened' : ''}`}>
        <li
          className={`places__option ${currentSort === SortType.POPULAR ? 'places__option--active' : ''}`}
          onClick={() => onSortOptionClick(SortType.POPULAR)}
          tabIndex={0}
        >Popular
        </li>
        <li
          className={`places__option ${currentSort === SortType.PRICE_ASCENDING ? 'places__option--active' : ''}`}
          onClick={() => onSortOptionClick(SortType.PRICE_ASCENDING)}
          tabIndex={0}
        >Price: low to high
        </li>
        <li
          className={`places__option ${currentSort === SortType.PRICE_DESCENDING ? 'places__option--active' : ''}`}
          onClick={() => onSortOptionClick(SortType.PRICE_DESCENDING)}
          tabIndex={0}
        >Price: high to low
        </li>
        <li
          className={`places__option ${currentSort === SortType.TOP_RATED ? 'places__option--active' : ''}`}
          onClick={() => onSortOptionClick(SortType.TOP_RATED)}
          tabIndex={0}
        >Top rated first
        </li>
      </ul>
    </form>
  );
}

export default connector(SortForm);
