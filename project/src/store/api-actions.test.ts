import {Action, AnyAction} from '@reduxjs/toolkit';
import {configureMockStore} from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {createAPI} from '../services/api';
import {State} from './reducer/root-reducer';
import {APIRoute, AppRoute, AuthorizationStatus, FAKE_ARRAY_LENGTH, FavoritePathname, HttpCode} from '../constants';
import {ActionsAPI, AuthData} from './api-actions';
import {ActionCreator} from './actions';
import * as Mock from '../utils/mock';
import Adapter from '../services/adapter';
import {AUTH_TOKEN_KEY_NAME} from '../services/token';
import {generatePath} from 'react-router-dom';

const FAKE_ID = 33;

const onFakeUnauthorized = jest.fn();
const api = createAPI(onFakeUnauthorized);
const mockApi = new MockAdapter(api);

const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<State, AnyAction, ThunkDispatch<State, typeof api, Action>>(middlewares);

describe('Async actions', () => {

  describe('On app start actions', () => {
    it('should set user & authorization to "AUTH" when GET/login', async () => {
      const store = mockStore();
      const user = Mock.getUserBackend();
      mockApi.onGet(APIRoute.Login).reply(HttpCode.OK, user);

      expect(store.getActions()).toEqual([]);

      await store.dispatch(ActionsAPI.checkAuth());

      expect(store.getActions()).toEqual([
        ActionCreator.setUser(Adapter.userToClient(user)),
        ActionCreator.requireAuthorization(AuthorizationStatus.AUTH),
      ]);
    });

    it('should dispatch loadOffers when GET/offers', async () => {
      const store = mockStore();
      const backendOffers = new Array(FAKE_ARRAY_LENGTH).fill(null).map(Mock.getOfferBackend);

      mockApi.onGet(APIRoute.GetOffers).reply(HttpCode.OK, backendOffers);

      expect(store.getActions()).toEqual([]);

      await store.dispatch(ActionsAPI.getOffers());

      expect(store.getActions()).toEqual([ActionCreator.loadOffers(backendOffers.map(Adapter.offerToClient))]);
    });
  });

  describe('On OfferPage open', () => {
    it('should dispatch loadNearOffers when GET/hotels/:hotel_id/nearby', async () => {
      const store = mockStore();
      const backendOffers = new Array(FAKE_ARRAY_LENGTH).fill(null).map(Mock.getOfferBackend);

      mockApi
        .onGet(generatePath(APIRoute.GetNearOffers,{'hotel_id': FAKE_ID}))
        .reply(HttpCode.OK, backendOffers);

      expect(store.getActions()).toEqual([]);

      await store.dispatch(ActionsAPI.getNearOffers(FAKE_ID));

      expect(store.getActions()).toEqual([
        ActionCreator.startLoadingNearOffers(FAKE_ID),
        ActionCreator.loadNearOffers(FAKE_ID, backendOffers.map(Adapter.offerToClient)),
      ]);
    });

    it('should dispatch loadReviews when GET/comments/:hotel_id', async () => {
      const store = mockStore();
      const reviews = new Array(FAKE_ARRAY_LENGTH).fill(null).map(Mock.getReviewBackend);

      mockApi
        .onGet(generatePath(APIRoute.GetReviews, {'hotel_id': FAKE_ID}))
        .reply(HttpCode.OK, reviews);

      expect(store.getActions()).toEqual([]);

      await store.dispatch(ActionsAPI.getReviews(FAKE_ID));

      expect(store.getActions()).toEqual([
        ActionCreator.startLoadingReviews(FAKE_ID),
        ActionCreator.loadReviews(FAKE_ID, reviews.map(Adapter.reviewToClient)),
      ]);
    });
  });

  it('should set submitting "true" => loadReviews => set submitting "false" when POST/comments/:hotel_id', async () => {
    const store = mockStore();
    const setReview = jest.fn();
    const review = Mock.getReview();
    const backendReview = new Array(FAKE_ARRAY_LENGTH).fill(null).map(Mock.getReviewBackend);

    mockApi
      .onPost(generatePath(APIRoute.PostReview, {'hotel_id': review.id}))
      .reply(HttpCode.OK, backendReview);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(ActionsAPI.postReview(review, setReview));

    expect(store.getActions()).toEqual([
      ActionCreator.setSubmittingState(true),
      ActionCreator.loadReviews(review.id, backendReview.map(Adapter.reviewToClient)),
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
    const user = Mock.getUserBackend();
    const authData: AuthData = {email: 'some@mail.com', password: 'password'};
    Storage.prototype.setItem = jest.fn();

    mockApi.onPost(APIRoute.Login).reply(HttpCode.OK, user);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(ActionsAPI.login(authData));

    expect(store.getActions()).toEqual([
      ActionCreator.setUser(Adapter.userToClient(user)),
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
    const backendOffers = new Array(FAKE_ARRAY_LENGTH).fill(null).map(Mock.getOfferBackend);

    mockApi.onGet(APIRoute.GetFavorites).reply(HttpCode.OK, backendOffers);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(ActionsAPI.getFavorites());

    expect(store.getActions()).toEqual([
      ActionCreator.startLoadingFavorites(),
      ActionCreator.loadFavorites(backendOffers.map(Adapter.offerToClient)),
    ]);
  });

  it('should dispatch loadFavorites and loadOffers when POST/favorite/:hotel_id/:status', async () => {
    const offerBackend = Mock.getOfferBackend();
    const offerClient = {...Adapter.offerToClient(offerBackend), isFavorite: !offerBackend['is_favorite']};
    const isFavorite = offerBackend['is_favorite'];

    const store = mockStore({
      DATA: {
        offers: [offerClient],
      },
    });

    mockApi
      .onPost(generatePath(APIRoute.PostFavorite, {
        'hotel_id': offerBackend.id,
        status: isFavorite ? FavoritePathname.addToFavorites : FavoritePathname.removeFromFavorites,
      }))
      .reply(HttpCode.OK, offerBackend);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(ActionsAPI.postFavorite(offerBackend.id, isFavorite));

    expect(store.getActions()).toEqual([
      ActionCreator.loadOffers([Adapter.offerToClient(offerBackend)]),
      ActionCreator.loadFavorites(isFavorite ? [Adapter.offerToClient(offerBackend)] : []),
    ]);
  });
});
