import {appReducer} from './app-reducer';
import {ActionCreator} from '../../actions';
import {INITIAL_CITY_NAME, SortType} from '../../../constants';

describe('Reducer: App', () => {
  const state = {
    selectedCity: INITIAL_CITY_NAME,
    currentSort: SortType.POPULAR,
    isSubmitting: false,
  };

  it('should return initial state without additional parameters', () => {
    expect(appReducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual(state);
  });

  it('should change selected city', () => {
    expect(appReducer(state, ActionCreator.changeCity('someCity')))
      .toEqual({...state, selectedCity: 'someCity'});
  });

  it('should change current sort', () => {
    expect(appReducer(state, ActionCreator.changeSort('someSortType')))
      .toEqual({...state, currentSort: 'someSortType'});
  });

  it('should correctly set submitting state', () => {
    expect(appReducer(state, ActionCreator.setSubmittingState(true)))
      .toEqual({...state, isSubmitting: true});
    expect(appReducer(state, ActionCreator.setSubmittingState(false)))
      .not.toEqual({...state, isSubmitting: true});
  });
});
