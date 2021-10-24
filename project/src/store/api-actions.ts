import {ThunkActionResult, loadOffers, requireAuthorization, requireLogout} from './actions';
import {APIRoute} from '../constants';
import {AuthorizationStatus} from '../constants';
import {Token} from '../services/token';
import {saveToken, dropToken} from '../services/token';
import Adapter from '../services/adapter';
import {OfferBackend} from '../types/offers';

type AuthData = {
  login: string,
  password: string,
};

const fetchOffersAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<OfferBackend[]>(APIRoute.GetOffers);
    const offers = data.map((offer) => Adapter.offerToClient(offer));
    console.log(offers) // eslint-disable-line
    dispatch(loadOffers(offers));
  };

const checkAuthAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    await api.get(APIRoute.Login)
      .then((response) => {
        dispatch(requireAuthorization(AuthorizationStatus.AUTH));
      })
      .catch((error) => {
        throw new Error(error);
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
