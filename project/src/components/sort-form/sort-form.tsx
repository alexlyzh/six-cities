import {useState} from 'react';
import {State} from '../../store/reducer/root-reducer';
import {Dispatch} from '@reduxjs/toolkit';
import {ActionCreator} from '../../store/actions';
import {SortType} from '../../constants';
import {connect, ConnectedProps} from 'react-redux';
import {getCurrentSort} from '../../store/reducer/app/selectors';

const mapStateToProps = (state: State) => ({
  currentSort: getCurrentSort(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onSortChange(sortType: string) {
    dispatch(ActionCreator.changeSort(sortType));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

function SortForm({currentSort, onSortChange}: PropsFromRedux): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const sortTypes = Object.keys(SortType);

  const onSortOptionClick = (sortType: string): void => {
    (sortType !== currentSort) && onSortChange(sortType);
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

export default connector(SortForm);
