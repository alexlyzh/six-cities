import {Offer, Review, UserBackend} from '../types/offers';
import {AuthorizationStatus} from '../constants';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {AxiosInstance} from 'axios';
import {State, ContentByID} from '../types/state';
import {AppRoute} from '../constants';

enum ActionType {
  LoadOffers = 'data/loadOffers',
  LoadReviews = 'data/loadReviews',
  LoadNearOffers = 'data/leadNearOffers',
  SetSubmittingState = 'data/setSubmittingState',
  ChangeCity = 'app/changeCity',
  ChangeSort = 'app/changeSort',
  Redirect = 'app/redirect',
  RequireAuthorization = 'user/requireAuthorization',
  RequireLogout = 'user/requireLogout',
  LoginUser = 'user/login',
}

const ActionCreator = {
  changeCity: (city: string) => ({
    type: ActionType.ChangeCity,
    payload: city,
  } as const),

  loadOffers: (offers: Offer[]) => ({
    type: ActionType.LoadOffers,
    payload: offers,
  } as const),

  loadReviews: (reviews: ContentByID<Review>) => ({
    type: ActionType.LoadReviews,
    payload: reviews,
  } as const),

  loadNearOffers: (offers: ContentByID<Offer>) => ({
    type: ActionType.LoadNearOffers,
    payload: offers,
  } as const),

  setSubmittingState: (isSubmitting: boolean) => ({
    type: ActionType.SetSubmittingState,
    payload: isSubmitting,
  } as const),

  changeSort: (sort: string) => ({
    type: ActionType.ChangeSort,
    payload: sort,
  } as const),

  requireAuthorization: (status: AuthorizationStatus) => ({
    type: ActionType.RequireAuthorization,
    payload: status,
  } as const),

  requireLogout: () => ({
    type: ActionType.RequireLogout,
  } as const),

  redirectToRoute: (url: AppRoute) => ({
    type: ActionType.Redirect,
    payload: url,
  } as const),

  setUser: (user: UserBackend | null) => ({
    type: ActionType.LoginUser,
    payload: user,
  } as const),
};

type Actions =
  | ReturnType<typeof ActionCreator.changeCity>
  | ReturnType<typeof ActionCreator.loadOffers>
  | ReturnType<typeof ActionCreator.loadReviews>
  | ReturnType<typeof ActionCreator.loadNearOffers>
  | ReturnType<typeof ActionCreator.setSubmittingState>
  | ReturnType<typeof ActionCreator.changeSort>
  | ReturnType<typeof ActionCreator.requireAuthorization>
  | ReturnType<typeof ActionCreator.requireLogout>
  | ReturnType<typeof ActionCreator.redirectToRoute>
  | ReturnType<typeof ActionCreator.setUser>;

type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Actions>;

type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Actions>;

export {ActionType, ActionCreator};
export type {Actions, ThunkActionResult, ThunkAppDispatch};
