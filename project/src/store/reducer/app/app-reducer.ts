import {Actions, ActionType} from '../../actions';
import {INITIAL_CITY_NAME, SortType} from '../../../constants';

type AppState = {
  selectedCity: string,
  currentSort: string,
  isSubmitting: boolean,
}

const initialAppState = {
  selectedCity: INITIAL_CITY_NAME,
  currentSort: SortType.POPULAR,
  isSubmitting: false,
};

const appReducer = (state: AppState = initialAppState, action: Actions): AppState => {
  switch (action.type) {
    case ActionType.ChangeCity:
      return {...state, selectedCity: action.payload};
    case ActionType.ChangeSort:
      return {...state, currentSort: action.payload};
    case ActionType.SetSubmittingState:
      return {...state, isSubmitting: action.payload};
    default:
      return state;
  }
};

export {appReducer};
export type {AppState};
