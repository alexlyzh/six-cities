import {
  ActionType,
  ChangeCityAction,
  ChangeHighlightedOfferAction,
  ChangeSortAction,
  GetAllOffersAction
} from '../../types/action';
import {Offer} from '../../types/offers';

const changeCity = (city: string): ChangeCityAction => ({
  type: ActionType.ChangeCity,
  payload: city,
});

const getOffers = (offers: Offer[]): GetAllOffersAction => ({
  type: ActionType.GetAllOffers,
  payload: offers,
});

const changeHighlightedOffer = (id: number | null): ChangeHighlightedOfferAction => ({
  type: ActionType.ChangeHighlightedOffer,
  payload: id,
});

const changeSort = (sort: string): ChangeSortAction => ({
  type: ActionType.ChangeSort,
  payload: sort,
});

export {changeCity, getOffers, changeHighlightedOffer, changeSort};
