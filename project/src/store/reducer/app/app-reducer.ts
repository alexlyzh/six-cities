import {ActionCreator} from '../../actions';
import {INITIAL_CITY_NAME, SortType} from '../../../constants';
import {createReducer} from '@reduxjs/toolkit';

type AppState = {
  selectedCity: string,
  currentSort: string,
  isSubmitting: boolean,
}

const initialState: AppState = {
  selectedCity: INITIAL_CITY_NAME,
  currentSort: SortType.POPULAR,
  isSubmitting: false,
};

const appReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(ActionCreator.changeCity, (state, action) => {
      state.selectedCity = action.payload;
    })
    .addCase(ActionCreator.changeSort, (state, action) => {
      state.currentSort = action.payload;
    })
    .addCase(ActionCreator.setSubmittingState, (state, action) => {
      state.isSubmitting = action.payload;
    });
});

export {appReducer};
export type {AppState};
