import {ThunkActionResult, ActionCreator} from './actions';
import {APIRoute, AppRoute} from '../constants';
import {AuthorizationStatus} from '../constants';
import {saveToken, dropToken} from '../services/token';
import Adapter from '../services/adapter';
import {OfferBackend, ReviewBackend, UserBackend} from '../types/offers';
import {generatePath} from 'react-router-dom';
import {toast} from 'react-toastify';
import {Dispatch} from 'react';
import {SetStateAction} from 'react';

const ErrorMessage = {
  PostReview: 'Something went wrong when sending your review...',
  GetReviews: 'Can\'t get reviews..',
  GetNearOffers: 'Can\'t get offers nearby..',
};

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

const fetchOffersAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<OfferBackend[]>(APIRoute.GetOffers);
    const offers = data.map((offer) => Adapter.offerToClient(offer));
    dispatch(ActionCreator.loadOffers(offers));
  };

const fetchReviewsAction = (id: number): ThunkActionResult =>
  async (dispatch, getState, api): Promise<void> => {
    dispatch(ActionCreator.startLoadingReviews(id));

    try {
      const {data} = await api.get<ReviewBackend[]>(`${generatePath(APIRoute.GetReviews,{'hotel_id': id})}`);
      const reviews = data.map((review) => Adapter.reviewToClient(review));
      dispatch(ActionCreator.loadReviews(id, reviews));
    } catch (err) {
      dispatch(ActionCreator.setReviewsLoadingError(id));
      toast(ErrorMessage.GetReviews);
    }
  };

const fetchNearOffersAction = (id: number): ThunkActionResult =>
  async (dispatch, getState, api): Promise<void> => {
    dispatch(ActionCreator.startLoadingNearOffers(id));

    try {
      const {data} = await api.get<OfferBackend[]>(`${generatePath(APIRoute.GetNearOffers, {'hotel_id': id})}`);
      const nearOffers = data.map((offer) => Adapter.offerToClient(offer));
      dispatch(ActionCreator.loadNearOffers(id, nearOffers));
    } catch (err) {
      dispatch(ActionCreator.setNearOffersLoadingError(id));
      toast(ErrorMessage.GetNearOffers);
    }
  };

const postReviewAction = ({id, comment, rating}: ReviewData, setReview: ResetReviewCallback): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    dispatch(ActionCreator.setSubmittingState(true));

    try {
      const {data} = await api.post(`${generatePath(APIRoute.PostReview, {'hotel_id': id})}`, {comment, rating});
      const reviews = data.map((review: ReviewBackend) => Adapter.reviewToClient(review));
      dispatch(ActionCreator.loadReviews(id, reviews));
      setReview({id, rating: null, comment: ''});
    } catch (err) {
      toast.error(ErrorMessage.PostReview);
    }

    dispatch(ActionCreator.setSubmittingState(false));
  };

const checkAuthAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    await api.get(APIRoute.Login)
      .then((response) => {
        if (response.data) {
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
  };

const loginAction = ({email, password}: AuthData): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    const {data} = await api.post<UserBackend>(APIRoute.Login, {email, password});
    saveToken(data.token);
    dispatch(ActionCreator.setUser(data));
    dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH));
    dispatch(ActionCreator.redirectToRoute(AppRoute.ROOT));
  };

const logoutAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(ActionCreator.setUser(null));
    dispatch(ActionCreator.requireLogout());
  };

export {
  fetchOffersAction,
  fetchReviewsAction,
  fetchNearOffersAction,
  postReviewAction,
  checkAuthAction,
  loginAction,
  logoutAction
};

export type {AuthData};

