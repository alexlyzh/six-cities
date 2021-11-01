import {Offer, Review, User} from '../types/offers';
import {AuthorizationStatus} from '../constants';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {AxiosInstance} from 'axios';
import {State} from './reducer/root-reducer';
import {AppRoute} from '../constants';

enum ActionType {
  LoadOffers = 'DATA/loadOffers',
  StartLoadingReviews = 'DATA/startLoadReviews',
  LoadReviews = 'DATA/loadReviews',
  ErrorLoadingReviews = 'DATA/errorLoadReviews',
  StartLoadingNearOffers = 'DATA/startLoadNearOffers',
  LoadNearOffers = 'DATA/loadNearOffers',
  ErrorLoadingNearOffers = 'DATA/errorLoadNearOffers',
  SetSubmittingState = 'APP/setSubmittingState',
  ChangeCity = 'APP/changeCity',
  ChangeSort = 'APP/changeSort',
  Redirect = 'APP/redirect',
  RequireAuthorization = 'USER/requireAuthorization',
  RequireLogout = 'USER/requireLogout',
  LoginUser = 'USER/login',
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

  startLoadingReviews: (offerId: number) => ({
    type: ActionType.StartLoadingReviews,
    payload: offerId,
  } as const),

  loadReviews: (offerId: number, reviews: Review[]) => ({
    type: ActionType.LoadReviews,
    payload: {offerId, reviews},
  } as const),

  setReviewsLoadingError: (offerId: number) => ({
    type: ActionType.ErrorLoadingReviews,
    payload: offerId,
  } as const),

  startLoadingNearOffers: (offerId: number) => ({
    type: ActionType.StartLoadingNearOffers,
    payload: offerId,
  } as const),

  loadNearOffers: (offerId: number, offers: Offer[]) => ({
    type: ActionType.LoadNearOffers,
    payload: {offerId, offers},
  } as const),

  setNearOffersLoadingError: (offerId: number) => ({
    type: ActionType.ErrorLoadingNearOffers,
    payload: offerId,
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

  setUser: (user: User | null) => ({
    type: ActionType.LoginUser,
    payload: user,
  } as const),
};

type Actions =
  | ReturnType<typeof ActionCreator.changeCity>
  | ReturnType<typeof ActionCreator.loadOffers>
  | ReturnType<typeof ActionCreator.loadReviews>
  | ReturnType<typeof ActionCreator.startLoadingReviews>
  | ReturnType<typeof ActionCreator.setReviewsLoadingError>
  | ReturnType<typeof ActionCreator.startLoadingNearOffers>
  | ReturnType<typeof ActionCreator.loadNearOffers>
  | ReturnType<typeof ActionCreator.setNearOffersLoadingError>
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
