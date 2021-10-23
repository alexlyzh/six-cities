import {State} from '../../types/state';
import {INITIAL_CITY_NAME, SortType} from '../../constants';
import {offers} from '../../mock/mock';
import {Actions, ActionType} from '../actions/actions';

const initialState: State = {
  selectedCity: INITIAL_CITY_NAME,
  offers: offers,
  currentSort: SortType.POPULAR,
};

const reducer = (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case ActionType.ChangeCity:
      return {...state, selectedCity: action.payload};
    case ActionType.GetAllOffers:
      return {...state, offers: action.payload};
    case ActionType.ChangeSort:
      return {...state, currentSort: action.payload};
    default:
      return state;
  }
};

export {reducer};
