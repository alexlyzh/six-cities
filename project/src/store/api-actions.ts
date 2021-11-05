import {ActionCreator, ThunkActionResult} from './actions';
import {APIRoute, AppRoute, AuthorizationStatus, ErrorMessage} from '../constants';
import {dropToken, saveToken} from '../services/token';
import Adapter from '../services/adapter';
import {OfferBackend, ReviewBackend, UserBackend} from '../types/types';
import {generatePath} from 'react-router-dom';
import {toast} from 'react-toastify';
import {Dispatch, SetStateAction} from 'react';

type AuthData = {
  email: string,
  password: string,
};

type ReviewData = {
  id: number,
  comment: string,
  rating: number | null,
}

type ResetReviewCallback = Dispatch<SetStateAction<{
  id: number,
  rating: null,
  comment: string
}>>;

const ActionsAPI = {
  getOffers: (): ThunkActionResult =>
    async (dispatch, _getState, api): Promise<void> => {
      const {data} = await api.get<OfferBackend[]>(APIRoute.GetOffers);
      const offers = data.map(Adapter.offerToClient);
      dispatch(ActionCreator.loadOffers(offers));
    },

  getReviews: (id: number): ThunkActionResult =>
    async (dispatch, _getState, api): Promise<void> => {
      dispatch(ActionCreator.startLoadingReviews(id));

      try {
        const {data} = await api.get<ReviewBackend[]>(`${generatePath(APIRoute.GetReviews,{'hotel_id': id})}`);
        const reviews = data.map(Adapter.reviewToClient);
        dispatch(ActionCreator.loadReviews(id, reviews));
      } catch (err) {
        dispatch(ActionCreator.setReviewsLoadingError(id));
        toast.error(ErrorMessage.GetReviews);
      }
    },

  getNearOffers: (id: number): ThunkActionResult =>
    async (dispatch, _getState, api): Promise<void> => {
      dispatch(ActionCreator.startLoadingNearOffers(id));

      try {
        const {data} = await api.get<OfferBackend[]>(`${generatePath(APIRoute.GetNearOffers, {'hotel_id': id})}`);
        const nearOffers = data.map(Adapter.offerToClient);
        dispatch(ActionCreator.loadNearOffers(id, nearOffers));
      } catch (err) {
        dispatch(ActionCreator.setNearOffersLoadingError(id));
        toast.error(ErrorMessage.GetNearOffers);
      }
    },

  checkAuth: (): ThunkActionResult =>
    async (dispatch, _getState, api) => {
      await api.get(APIRoute.Login)
        .then((response) => {
          if (response && response.data) {
            saveToken(response.data.token);
            dispatch(ActionCreator.setUser(response.data));
            dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH));
          } else {
            dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH));
          }
        })
        .catch((error) => {
          throw new Error(error);
        });
    },

  login: ({email, password}: AuthData): ThunkActionResult =>
    async (dispatch, _getState, api) => {
      try {
        const {data} = await api.post<UserBackend>(APIRoute.Login, {email, password});
        saveToken(data.token);
        dispatch(ActionCreator.setUser(Adapter.userToClient(data)));
        dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH));
        dispatch(ActionCreator.redirectToRoute(AppRoute.ROOT));
      } catch (err) {
        toast.error(ErrorMessage.Login);
      }
    },

  logout: (): ThunkActionResult =>
    async (dispatch, getState, api) => {
      try {
        await api.delete(APIRoute.Logout);
        dropToken();
        dispatch(ActionCreator.requireLogout());
        dispatch(ActionCreator.clearPersonalData());
      } catch (err) {
        toast.error(ErrorMessage.Logout);
        throw err;
      }
    },

  postReview: ({id, comment, rating}: ReviewData, setReview: ResetReviewCallback): ThunkActionResult =>
    async (dispatch, _getState, api) => {
      dispatch(ActionCreator.setSubmittingState(true));

      try {
        const {data} = await api.post<ReviewBackend[]>(`${generatePath(APIRoute.PostReview, {'hotel_id': id})}`, {comment, rating});
        const reviews = data.map(Adapter.reviewToClient);
        dispatch(ActionCreator.loadReviews(id, reviews));
        setReview({id, rating: null, comment: ''});
      } catch (err) {
        toast.error(ErrorMessage.PostReview);
      }

      dispatch(ActionCreator.setSubmittingState(false));
    },

  getFavorites: (): ThunkActionResult =>
    async (dispatch, getState, api): Promise<void > => {
      if (getState().USER.authorizationStatus === AuthorizationStatus.AUTH) {
        dispatch(ActionCreator.startLoadingFavorites());

        try {
          const {data} = await api.get<OfferBackend[]>(APIRoute.GetFavorites);
          const favorites = data ? data.map(Adapter.offerToClient) : [];
          dispatch(ActionCreator.loadFavorites(favorites));
        } catch (err) {
          dispatch(ActionCreator.setFavoritesLoadingError);
          toast.error(ErrorMessage.GetFavorites);
          throw err;
        }
      }
    },

  postFavorite: (offerId: number, status: 1 | 0): ThunkActionResult =>
    async (dispatch, getState, api): Promise<void > => {
      const response = await api.post<OfferBackend>(`${generatePath(APIRoute.PostFavorite,{'hotel_id': offerId, status})}`);

      if (response) {
        const {data} = response;
        const updatedOffer = Adapter.offerToClient(data);
        const offers = [...getState().DATA.offers];
        const index = offers.findIndex((offer) => offer.id === updatedOffer.id);
        const updatedOffers = [...offers.slice(0, index), updatedOffer, ...offers.slice(index + 1)];
        dispatch(ActionCreator.loadOffers(updatedOffers));
        dispatch(ActionCreator.loadFavorites(updatedOffers.filter((item) => item.isFavorite)));
      }
    },
};

export {ActionsAPI};
export type {AuthData};
