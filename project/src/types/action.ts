import {Offer} from './offers';

enum ActionType {
  ChangeCity = 'ChangeCity',
  GetAllOffers = 'GetAllOffers',
  ChangeHighlightedOffer = 'ChangeHighlightedOffer',
  ChangeSort = 'ChangeSort',
}

type ChangeCityAction = {
  type: ActionType.ChangeCity,
  payload: string,
};

type GetAllOffersAction = {
  type: ActionType.GetAllOffers,
  payload: Offer[],
};

type ChangeHighlightedOfferAction = {
  type: ActionType.ChangeHighlightedOffer,
  payload: number | null,
};

type ChangeSortAction = {
  type: ActionType.ChangeSort,
  payload: string,
};

type Actions = ChangeCityAction |
  GetAllOffersAction |
  ChangeHighlightedOfferAction |
  ChangeSortAction;

export {ActionType};
export type {Actions,
  ChangeCityAction,
  GetAllOffersAction,
  ChangeHighlightedOfferAction,
  ChangeSortAction
};
