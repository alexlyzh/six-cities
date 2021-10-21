import {ActionType, ChangeCityAction, ChangeHighlightedOffer, GetAllOffersAction} from '../../types/action';
import {Offer} from '../../types/offers';

const changeCity = (city: string): ChangeCityAction => ({
  type: ActionType.ChangeCity,
  payload: city,
});

const getOffers = (offers: Offer[]): GetAllOffersAction => ({
  type: ActionType.GetAllOffers,
  payload: offers,
});

const changeHighlightedOffer = (id: number | null): ChangeHighlightedOffer => ({
  type: ActionType.ChangeHighlightedOffer,
  payload: id,
});

export {changeCity, getOffers, changeHighlightedOffer};
