import {Offer} from '../types/offers';
import {AuthorizationStatus} from '../constants';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {AxiosInstance} from 'axios';
import {State} from '../types/state';

enum ActionType {
  LoadOffers = 'data/loadOffers',
  ChangeCity = 'app/changeCity',
  ChangeSort = 'app/changeSort',
  RequireAuthorization = 'user/requireAuthorization',
  RequireLogout = 'user/requireLogout',
}

const changeCity = (city: string) => ({
  type: ActionType.ChangeCity,
  payload: city,
} as const);

const loadOffers = (offers: Offer[]) => ({
  type: ActionType.LoadOffers,
  payload: offers,
} as const);

const changeSort = (sort: string) => ({
  type: ActionType.ChangeSort,
  payload: sort,
} as const);

const requireAuthorization = (status: AuthorizationStatus) => ({
  type: ActionType.RequireAuthorization,
  payload: status,
} as const);

const requireLogout = () => ({
  type: ActionType.RequireLogout,
} as const);

type Actions =
  | ReturnType<typeof changeCity>
  | ReturnType<typeof loadOffers>
  | ReturnType<typeof changeSort>
  | ReturnType<typeof requireAuthorization>
  | ReturnType<typeof requireLogout>;

type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Actions>;

type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Actions>;

export {
  ActionType,
  changeCity,
  loadOffers,
  changeSort,
  requireAuthorization,
  requireLogout
};
export type {Actions, ThunkActionResult, ThunkAppDispatch};
