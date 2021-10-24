import {ThunkActionResult, loadOffers, requireAuthorization, requireLogout} from './actions';
import {APIRoute} from '../constants';
import {AuthorizationStatus} from '../constants';
import {Offer} from '../types/offers';
import {Token} from '../services/token';
import {saveToken, dropToken} from '../services/token';

type AuthData = {
  login: string,
  password: string,
};

const fetchOffersAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<Offer[]>(APIRoute.GetOffers);
    dispatch(loadOffers(data));
  };

const checkAuthAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    await api.get(APIRoute.Login)
      .then(() => {
        dispatch(requireAuthorization(AuthorizationStatus.AUTH));
      });
  };

const loginAction = ({login: email, password}: AuthData): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    const {data: {token}} = await api.post<{token: Token}>(APIRoute.Login, {email, password});
    saveToken(token);
    dispatch(requireAuthorization(AuthorizationStatus.AUTH));
  };

const logoutAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireLogout());
  };

export {
  fetchOffersAction,
  checkAuthAction,
  loginAction,
  logoutAction
};
