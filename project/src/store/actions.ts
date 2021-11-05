import {Offer, Review, User} from '../types/types';
import {AuthorizationStatus} from '../constants';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {AxiosInstance} from 'axios';
import {State} from './reducer/root-reducer';
import {AppRoute} from '../constants';
import {createAction} from '@reduxjs/toolkit';
import {Action} from '@reduxjs/toolkit';

enum ActionType {
  LoadOffers = 'DATA/loadOffers',
  StartLoadingFavorites = 'DATA/startLoadFavorites',
  LoadFavorites = 'DATA/loadFavorites',
  ErrorLoadingFavorites = 'DATA/errorLoadFavorites',
  StartLoadingReviews = 'DATA/startLoadReviews',
  LoadReviews = 'DATA/loadReviews',
  ErrorLoadingReviews = 'DATA/errorLoadReviews',
  StartLoadingNearOffers = 'DATA/startLoadNearOffers',
  LoadNearOffers = 'DATA/loadNearOffers',
  ErrorLoadingNearOffers = 'DATA/errorLoadNearOffers',
  clearPersonalData = 'DATA/clearPersonalData',
  SetSubmittingState = 'APP/setSubmittingState',
  ChangeCity = 'APP/changeCity',
  ChangeSort = 'APP/changeSort',
  Redirect = 'APP/redirect',
  RequireAuthorization = 'USER/requireAuthorization',
  RequireLogout = 'USER/requireLogout',
  LoginUser = 'USER/login',
}

const ActionCreator = {
  changeCity: createAction(
    ActionType.ChangeCity,
    (city: string) => ({
      payload: city,
    }),
  ),

  loadOffers: createAction(
    ActionType.LoadOffers,
    (offers: Offer[]) => ({
      payload: offers,
    }),
  ),

  startLoadingFavorites: createAction(ActionType.StartLoadingFavorites),

  loadFavorites: createAction(
    ActionType.LoadFavorites,
    (offers: Offer[]) => ({
      payload: offers,
    }),
  ),

  setFavoritesLoadingError: createAction(ActionType.ErrorLoadingFavorites),

  startLoadingReviews: createAction(
    ActionType.StartLoadingReviews,
    (offerId: number) => ({
      payload: offerId,
    }),
  ),

  loadReviews: createAction(
    ActionType.LoadReviews,
    (offerId: number, reviews: Review[]) => ({
      payload: {offerId, reviews},
    }),
  ),

  setReviewsLoadingError: createAction(
    ActionType.ErrorLoadingReviews,
    (offerId: number) => ({
      payload: offerId,
    }),
  ),

  startLoadingNearOffers: createAction(
    ActionType.StartLoadingNearOffers,
    (offerId: number) => ({
      payload: offerId,
    }),
  ),

  loadNearOffers: createAction(
    ActionType.LoadNearOffers,
    (offerId: number, offers: Offer[]) => ({
      payload: {offerId, offers},
    }),
  ),

  setNearOffersLoadingError: createAction(
    ActionType.ErrorLoadingNearOffers,
    (offerId: number) => ({
      payload: offerId,
    }),
  ),

  setSubmittingState: createAction(
    ActionType.SetSubmittingState,
    (isSubmitting: boolean) => ({
      payload: isSubmitting,
    }),
  ),

  changeSort: createAction(
    ActionType.ChangeSort,
    (sort: string) => ({
      payload: sort,
    }),
  ),

  requireAuthorization: createAction(
    ActionType.RequireAuthorization,
    (status: AuthorizationStatus) => ({
      payload: status,
    }),
  ),

  requireLogout: createAction(ActionType.RequireLogout),

  clearPersonalData: createAction(ActionType.clearPersonalData),

  redirectToRoute: createAction(
    ActionType.Redirect,
    (url: AppRoute) => ({
      payload: url,
    }),
  ),

  setUser: createAction(
    ActionType.LoginUser,
    (user: User) => ({
      payload: user,
    }),
  ),
};

type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Action>;

type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Action>;

export {ActionType, ActionCreator};
export type {ThunkActionResult, ThunkAppDispatch};
