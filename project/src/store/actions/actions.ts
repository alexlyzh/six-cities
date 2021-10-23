import {Offer} from '../../types/offers';

enum ActionType {
  ChangeCity = 'ChangeCity',
  GetAllOffers = 'GetAllOffers',
  ChangeSort = 'ChangeSort',
}

const changeCity = (city: string) => ({
  type: ActionType.ChangeCity,
  payload: city,
} as const);

const getOffers = (offers: Offer[]) => ({
  type: ActionType.GetAllOffers,
  payload: offers,
} as const);

const changeSort = (sort: string) => ({
  type: ActionType.ChangeSort,
  payload: sort,
} as const);

type Actions =
  | ReturnType<typeof changeCity>
  | ReturnType<typeof getOffers>
  | ReturnType<typeof changeSort>;

export {changeCity, getOffers, changeSort, ActionType};
export type {Actions};
