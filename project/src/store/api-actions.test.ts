import {Action, AnyAction} from '@reduxjs/toolkit';
import {configureMockStore} from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {createAPI} from '../services/api';
import {State} from './reducer/root-reducer';
import {APIRoute, AppRoute, AuthorizationStatus, FAKE_ARRAY_LENGTH, FAKE_ID, FavoritePathname, HttpCode} from '../constants';
import {ActionsAPI, AuthData} from './api-actions';
import {ActionCreator} from './actions';
import * as Mock from '../utils/mock';
import Adapter from '../services/adapter';
import {AUTH_TOKEN_KEY_NAME} from '../services/token';
import {generatePath} from 'react-router-dom';

const onFakeUnauthorized = jest.fn();
const api = createAPI(onFakeUnauthorized);
const mockApi = new MockAdapter(api);

const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<State, AnyAction, ThunkDispatch<State, typeof api, Action>>(middlewares);

describe('Async actions', () => {

  describe('On app start actions', () => {
    it('should set user & authorization to "AUTH" when GET/login', async () => {
      const store = mockStore();
      const user = Mock.getUser();
      mockApi.onGet(APIRoute.Login).reply(HttpCode.OK, user);

      expect(store.getActions()).toEqual([]);

      await store.dispatch(ActionsAPI.checkAuth());

      expect(store.getActions()).toEqual([
        ActionCreator.setUser(user),
        ActionCreator.requireAuthorization(AuthorizationStatus.AUTH),
      ]);
    });

    it('should dispatch loadOffers when GET/offers', async () => {
      const store = mockStore();
      const offers = new Array(FAKE_ARRAY_LENGTH).fill(null).map(Mock.getOffer);

      mockApi.onGet(APIRoute.GetOffers).reply(HttpCode.OK, offers);

      expect(store.getActions()).toEqual([]);

      await store.dispatch(ActionsAPI.getOffers());

      expect(store.getActions()).toEqual([ActionCreator.loadOffers(offers)]);
    });
  });

  describe('On OfferPage open', () => {
    it('should dispatch loadNearOffers when GET/hotels/:hotel_id/nearby', async () => {
      const store = mockStore();
      const offer = new Array(FAKE_ARRAY_LENGTH).fill(null).map(Mock.getOffer);

      mockApi
        .onGet(generatePath(APIRoute.GetNearOffers,{'hotel_id': FAKE_ID}))
        .reply(HttpCode.OK, offer);

      expect(store.getActions()).toEqual([]);

      await store.dispatch(ActionsAPI.getNearOffers(FAKE_ID));

      expect(store.getActions()).toEqual([
        ActionCreator.startLoadingNearOffers(FAKE_ID),
        ActionCreator.loadNearOffers(FAKE_ID, offer),
      ]);
    });

    it('should dispatch loadReviews when GET/comments/:hotel_id', async () => {
      const store = mockStore();
      const reviews = new Array(FAKE_ARRAY_LENGTH).fill(null).map(Mock.getReview);

      mockApi
        .onGet(generatePath(APIRoute.GetReviews, {'hotel_id': FAKE_ID}))
        .reply(HttpCode.OK, reviews);

      expect(store.getActions()).toEqual([]);

      await store.dispatch(ActionsAPI.getReviews(FAKE_ID));

      expect(store.getActions()).toEqual([
        ActionCreator.startLoadingReviews(FAKE_ID),
        ActionCreator.loadReviews(FAKE_ID, reviews),
      ]);
    });
  });

  it('should set submitting "true" => loadReviews => set submitting "false" when POST/comments/:hotel_id', async () => {
    const store = mockStore();
    const setReview = jest.fn();
    const review = Mock.getReview();
    const backendReviews = new Array(FAKE_ARRAY_LENGTH).fill(null).map(Mock.getReview);

    mockApi
      .onPost(generatePath(APIRoute.PostReview, {'hotel_id': review.id}))
      .reply(HttpCode.OK, backendReviews);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(ActionsAPI.postReview(review, setReview));

    expect(store.getActions()).toEqual([
      ActionCreator.setSubmittingState(true),
      ActionCreator.loadReviews(review.id, backendReviews),
      ActionCreator.setSubmittingState(false),
    ]);

    expect(setReview).toBeCalledTimes(1);
    expect(setReview).toBeCalledWith({
      id: review.id,
      rating: null,
      comment: '',
    });
  });

  it('should set user, authorization "AUTH", redirect to "ROOT" when POST/login', async () => {
    const store = mockStore();
    const user = Mock.getUser();
    const authData: AuthData = {email: 'some@mail.com', password: 'password'};
    Storage.prototype.setItem = jest.fn();

    mockApi.onPost(APIRoute.Login).reply(HttpCode.OK, user);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(ActionsAPI.login(authData));

    expect(store.getActions()).toEqual([
      ActionCreator.setUser(user),
      ActionCreator.requireAuthorization(AuthorizationStatus.AUTH),
      ActionCreator.redirectToRoute(AppRoute.ROOT),
    ]);

    expect(Storage.prototype.setItem).toBeCalledTimes(1);
    expect(Storage.prototype.setItem).toBeCalledWith(AUTH_TOKEN_KEY_NAME, user.token);
  });

  it('should dispatch logout when DELETE/logout', async () => {
    const store = mockStore();
    Storage.prototype.removeItem = jest.fn();

    mockApi.onDelete(APIRoute.Logout).reply(HttpCode.NoContent);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(ActionsAPI.logout());

    expect(store.getActions()).toEqual([
      ActionCreator.requireLogout(),
      ActionCreator.clearPersonalData(),
    ]);

    expect(Storage.prototype.removeItem).toBeCalledTimes(1);
    expect(Storage.prototype.removeItem).toBeCalledWith(AUTH_TOKEN_KEY_NAME);
  });

  it('should dispatch loadFavorites when GET/favorite', async () => {
    const store = mockStore();
    const offers = new Array(FAKE_ARRAY_LENGTH).fill(null).map(Mock.getOffer);

    mockApi.onGet(APIRoute.GetFavorites).reply(HttpCode.OK, offers);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(ActionsAPI.getFavorites());

    expect(store.getActions()).toEqual([
      ActionCreator.startLoadingFavorites(),
      ActionCreator.loadFavorites(offers),
    ]);
  });

  describe('API action when requesting POST/favorite/:hotel_id/:status', () => {
    const offerBackend = Mock.getOffer();
    const offerClient = {...offerBackend, isFavorite: !offerBackend.isFavorite};
    const isFavorite = offerBackend.isFavorite;

    mockApi
      .onPost(generatePath(APIRoute.PostFavorite, {
        'hotel_id': offerBackend.id,
        status: isFavorite ? FavoritePathname.addToFavorites : FavoritePathname.removeFromFavorites,
      }))
      .reply(HttpCode.OK, offerBackend);

    it('should dispatch loadFavorites, loadOffers, loadNearOffers from "near offers" block', async () => {
      const fakeAnchorOffer = {...offerClient};
      fakeAnchorOffer.id++;

      const store = mockStore({
        DATA: {
          offers: [offerClient],
          nearOffers: {
            [fakeAnchorOffer.id]: {
              requestStatus: 'SUCCESS',
              data: [offerClient],
            },
          },
        },
      });

      expect(store.getActions()).toEqual([]);

      await store.dispatch(ActionsAPI.postFavorite(offerBackend.id, isFavorite, fakeAnchorOffer.id));

      expect(store.getActions()).toEqual([
        ActionCreator.loadOffers([offerBackend]),
        ActionCreator.loadNearOffers(fakeAnchorOffer.id, [offerBackend]),
        ActionCreator.loadFavorites(isFavorite ? [offerBackend] : []),
      ]);
    });

    it('should dispatch loadFavorites and loadOffers from NOT "near offers" block', async () => {
      const store = mockStore({
        DATA: {
          offers: [offerClient],
        },
      });

      expect(store.getActions()).toEqual([]);

      await store.dispatch(ActionsAPI.postFavorite(offerBackend.id, isFavorite));

      expect(store.getActions()).toEqual([
        ActionCreator.loadOffers([offerBackend]),
        ActionCreator.loadFavorites(isFavorite ? [offerBackend] : []),
      ]);
    });
  });
});
