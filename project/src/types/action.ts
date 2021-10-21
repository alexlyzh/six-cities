import {Offer} from './offers';

enum ActionType {
  ChangeCity = 'ChangeCity',
  GetAllOffers = 'GetAllOffers',
  ChangeHighlightedOffer = 'ChangeHighlightedOffer',
}

type ChangeCityAction = {
  type: ActionType.ChangeCity,
  payload: string,
};

type GetAllOffersAction = {
  type: ActionType.GetAllOffers,
  payload: Offer[],
};

type ChangeHighlightedOffer = {
  type: ActionType.ChangeHighlightedOffer,
  payload: number | null,
};

type Actions = ChangeCityAction |
  GetAllOffersAction |
  ChangeHighlightedOffer;

export {ActionType};
export type {Actions, ChangeCityAction, GetAllOffersAction, ChangeHighlightedOffer};
