import { createFeatureSelector, createSelector } from '@ngrx/store';
import { HousesState } from './houses.reducer';

export const selectHousesState = createFeatureSelector<HousesState>('houses');
export const selectHouses = createSelector(selectHousesState, state => state.houses);
export const selectHousesLoading = createSelector(selectHousesState, state => state.loading);
export const selectHousesError = createSelector(selectHousesState, state => state.error);
export const selectTotalItems = createSelector(
    selectHousesState,
    state => state.totalItems
);