import { createReducer, on } from '@ngrx/store';
import * as FavoritesActions from './favorites.actions';
import { HouseCardModel } from '../models/house-card';

export interface FavoritesState {
  favorites: HouseCardModel[];
}

export const initialState: FavoritesState = {
  favorites: [],
};

export const favoritesReducer = createReducer(
  initialState,
  on(FavoritesActions.loadFavoritesSuccess, (state, { favorites }) => ({ ...state, favorites })),
  on(FavoritesActions.addFavorite, (state, { house }) => ({
    ...state,
    favorites: state.favorites.some(h => h.url === house.url) 
      ? state.favorites 
      : [...state.favorites, house],
  })),
  on(FavoritesActions.removeFavorite, (state, { houseId }) => ({
    ...state,
    favorites: state.favorites.filter(h => h.url !== houseId),
  }))
);