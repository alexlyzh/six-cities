import {
  ThunkActionResult,
  loadOffers,
  requireAuthorization,
  requireLogout,
  redirectToRoute,
  setUser
} from './actions';
import {APIRoute, AppRoute} from '../constants';
import {AuthorizationStatus} from '../constants';
import {saveToken, dropToken} from '../services/token';
import Adapter from '../services/adapter';
import {OfferBackend, UserBackend} from '../types/offers';

type AuthData = {
  email: string,
  password: string,
};

const fetchOffersAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<OfferBackend[]>(APIRoute.GetOffers);
    const offers = data.map((offer) => Adapter.offerToClient(offer));
    dispatch(loadOffers(offers));
  };

const checkAuthAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    await api.get(APIRoute.Login)
      .then((response) => {
        if (response.data) {
          saveToken(response.data.token);
          dispatch(setUser(response.data));
          dispatch(requireAuthorization(AuthorizationStatus.AUTH));
        } else {
          dispatch(requireAuthorization(AuthorizationStatus.NO_AUTH));
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
    dispatch(setUser(data));
    dispatch(requireAuthorization(AuthorizationStatus.AUTH));
    dispatch(redirectToRoute(AppRoute.ROOT));
  };

const logoutAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(setUser(null));
    dispatch(requireLogout());
  };

export {
  fetchOffersAction,
  checkAuthAction,
  loginAction,
  logoutAction
};

export type {AuthData};

