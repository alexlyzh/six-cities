import {ActionCreator, ThunkActionResult} from './actions';
import {APIRoute, AppRoute, AuthorizationStatus, ErrorMessage, FavoritePathname} from '../constants';
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
        const {data} = await api.get<ReviewBackend[]>(generatePath(APIRoute.GetReviews,{'hotel_id': id}));
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
        const {data} = await api.get<OfferBackend[]>(generatePath(APIRoute.GetNearOffers, {'hotel_id': id}));
        const nearOffers = data.map(Adapter.offerToClient);
        dispatch(ActionCreator.loadNearOffers(id, nearOffers));
      } catch (err) {
        dispatch(ActionCreator.setNearOffersLoadingError(id));
        toast.error(ErrorMessage.GetNearOffers);
      }
    },

  checkAuth: (): ThunkActionResult =>
    async (dispatch, _getState, api): Promise<void> => {
      await api.get(APIRoute.Login)
        .then((response) => {
          if (response && response.data) {
            saveToken(response.data.token);
            dispatch(ActionCreator.setUser(Adapter.userToClient(response.data)));
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
    async (dispatch, _getState, api): Promise<void> => {
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
    async (dispatch, _getState, api): Promise<void> => {
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
    async (dispatch, _getState, api): Promise<void> => {
      dispatch(ActionCreator.setSubmittingState(true));

      try {
        const {data} = await api.post<ReviewBackend[]>(generatePath(APIRoute.PostReview, {'hotel_id': id}), {comment, rating});
        const reviews = data.map(Adapter.reviewToClient);
        dispatch(ActionCreator.loadReviews(id, reviews));
        setReview({id, rating: null, comment: ''});
      } catch (err) {
        toast.error(ErrorMessage.PostReview);
      }

      dispatch(ActionCreator.setSubmittingState(false));
    },

  getFavorites: (): ThunkActionResult =>
    async (dispatch, getState, api): Promise<void> => {
      dispatch(ActionCreator.startLoadingFavorites());

      try {
        const {data} = await api.get<OfferBackend[]>(APIRoute.GetFavorites);
        const favorites = data ? data.map(Adapter.offerToClient) : [];
        dispatch(ActionCreator.loadFavorites(favorites));
      } catch (err) {
        dispatch(ActionCreator.setFavoritesLoadingError());
        toast.error(ErrorMessage.GetFavorites);
        throw err;
      }
    },

  postFavorite: (offerId: number, isFavorite: boolean): ThunkActionResult =>
    async (dispatch, getState, api): Promise<void> => {
      try {
        const {data} = await api.post<OfferBackend>(generatePath(APIRoute.PostFavorite,{
          'hotel_id': offerId,
          status: isFavorite ? FavoritePathname.addToFavorites : FavoritePathname.removeFromFavorites,
        }));

        const updatedOffer = Adapter.offerToClient(data);
        const offers = [...getState().DATA.offers];
        const index = offers.findIndex((offer) => offer.id === updatedOffer.id);
        offers.splice(index, 1, updatedOffer);

        dispatch(ActionCreator.loadOffers(offers));
        dispatch(ActionCreator.loadFavorites(offers.filter((item) => item.isFavorite)));
      } catch (err) {
        toast.error(ErrorMessage.PostFavorite);
        throw err;
      }
    },
};

export {ActionsAPI};
export type {AuthData};
