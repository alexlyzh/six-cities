import {ActionCreator, ThunkActionResult} from './actions';
import {APIRoute, AppRoute, AuthorizationStatus, ErrorMessage, FavoritePathname} from '../constants';
import {dropToken, saveToken} from '../services/token';
import {Offer, Review, User} from '../types/types';
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

const replaceElementInArray = (element: Offer, elements: Offer[]) => {
  const index = elements.findIndex((offer) => offer.id === element.id);
  elements.splice(index, 1, element);
};

const ActionsAPI = {
  getOffers: (): ThunkActionResult =>
    async (dispatch, _getState, api): Promise<void> => {
      const {data} = await api.get<Offer[]>(APIRoute.GetOffers);
      dispatch(ActionCreator.loadOffers(data));
    },

  getReviews: (id: number): ThunkActionResult =>
    async (dispatch, _getState, api): Promise<void> => {
      dispatch(ActionCreator.startLoadingReviews(id));

      try {
        const {data} = await api.get<Review[]>(generatePath(APIRoute.GetReviews,{'hotel_id': id}));
        dispatch(ActionCreator.loadReviews(id, data));
      } catch (err) {
        dispatch(ActionCreator.setReviewsLoadingError(id));
        toast.error(ErrorMessage.GetReviews);
      }
    },

  getNearOffers: (id: number): ThunkActionResult =>
    async (dispatch, _getState, api): Promise<void> => {
      dispatch(ActionCreator.startLoadingNearOffers(id));

      try {
        const {data} = await api.get<Offer[]>(generatePath(APIRoute.GetNearOffers, {'hotel_id': id}));
        dispatch(ActionCreator.loadNearOffers(id, data));
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
    async (dispatch, _getState, api): Promise<void> => {
      try {
        const {data} = await api.post<User>(APIRoute.Login, {email, password});
        saveToken(data.token);
        dispatch(ActionCreator.setUser(data));
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
        const {data} = await api.post<Review[]>(generatePath(APIRoute.PostReview, {'hotel_id': id}), {comment, rating});
        dispatch(ActionCreator.loadReviews(id, data));
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
        const {data} = await api.get<Offer[]>(APIRoute.GetFavorites);
        dispatch(ActionCreator.loadFavorites(data));
      } catch (err) {
        dispatch(ActionCreator.setFavoritesLoadingError());
        toast.error(ErrorMessage.GetFavorites);
        throw err;
      }
    },

  postFavorite: (offerId: number, isFavorite: boolean, anchorOfferId: number | null = null): ThunkActionResult =>
    async (dispatch, getState, api): Promise<void> => {
      try {
        const {data} = await api.post<Offer>(generatePath(APIRoute.PostFavorite,{
          'hotel_id': offerId,
          status: isFavorite ? FavoritePathname.addToFavorites : FavoritePathname.removeFromFavorites,
        }));

        const offers = [...getState().DATA.offers];
        replaceElementInArray(data, offers);
        dispatch(ActionCreator.loadOffers(offers));

        if (anchorOfferId !== null) {
          const dataNearOffers = [...getState().DATA.nearOffers[anchorOfferId].data];
          replaceElementInArray(data, dataNearOffers);
          dispatch(ActionCreator.loadNearOffers(anchorOfferId, dataNearOffers));
        }

        dispatch(ActionCreator.loadFavorites(offers.filter((item) => item.isFavorite)));
      } catch (err) {
        toast.error(ErrorMessage.PostFavorite);
        throw err;
      }
    },
};

export {ActionsAPI};
export type {AuthData};
