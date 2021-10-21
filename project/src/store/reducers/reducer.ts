import {State} from '../../types/state';
import {Actions, ActionType} from '../../types/action';
import {INITIAL_CITY_NAME} from '../../constants';
import {offers} from '../../mock/mock';


const initialState: State = {
  selectedCity: INITIAL_CITY_NAME,
  offers: offers,
};

const reducer = (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case ActionType.ChangeCity:
      return {...state, selectedCity: action.payload};
    case ActionType.GetAllOffers:
      return {...state, offers: action.payload};
    case ActionType.ChangeHighlightedOffer:
      return {...state, highlightedOffer: state.offers.find((offer) => offer.id === action.payload)};
    default:
      return state;
  }
};

export {reducer};
