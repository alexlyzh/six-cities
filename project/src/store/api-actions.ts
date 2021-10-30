import {ThunkActionResult, ActionCreator} from './actions';
import {APIRoute, AppRoute} from '../constants';
import {AuthorizationStatus} from '../constants';
import {saveToken, dropToken} from '../services/token';
import Adapter from '../services/adapter';
import {OfferBackend, ReviewBackend, UserBackend} from '../types/offers';
import {generatePath} from 'react-router-dom';
import {toast} from 'react-toastify';

const REVIEW_SUBMIT_ERR_TEXT = 'Some trouble occurred during sending your review...';

type AuthData = {
  email: string,
  password: string,
};

type ReviewData = {
  id: number,
  comment: string,
  rating: number | null,
}

const fetchOffersAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<OfferBackend[]>(APIRoute.GetOffers);
    const offers = data.map((offer) => Adapter.offerToClient(offer));
    dispatch(ActionCreator.loadOffers(offers));
  };

const fetchReviewsAction = (id: number): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    dispatch(ActionCreator.startLoadingReviews(id));

    try {
      const {data} = await api.get<ReviewBackend[]>(`${generatePath(APIRoute.GetReviews,{'hotel_id': id})}`);
      const reviews = data.map((review) => Adapter.reviewToClient(review));

      dispatch(ActionCreator.loadReviews(id, reviews));
    } catch(e) {
      dispatch(ActionCreator.loadReviewsError(id));
    }
  };

const fetchNearOffersAction = (id: number): ThunkActionResult =>
  async (dispatch, getState, api): Promise<void> => {
    const {data} = await api.get<OfferBackend[]>(`${generatePath(APIRoute.GetNearOffers,{'hotel_id': id})}`);
    if (id !== getState().nearOffers.id) {
      const offers = data.map((offer) => Adapter.offerToClient(offer));
      dispatch(ActionCreator.loadNearOffers({id, data: offers}));
    }
  };

const postReview = ({id, comment, rating}: ReviewData): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    dispatch(ActionCreator.setSubmittingState(true));
    try {
      const {data} = await api.post(`${generatePath(APIRoute.PostReview, {'hotel_id': id})}`, {comment, rating});
      const reviews = data.map((review: ReviewBackend) => Adapter.reviewToClient(review));
      dispatch(ActionCreator.loadReviews(id, reviews));
    } catch (err) {
      toast.error(REVIEW_SUBMIT_ERR_TEXT);
      throw err;
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
  postReview,
  checkAuthAction,
  loginAction,
  logoutAction
};

export type {AuthData};

