import { createAction, props } from '@ngrx/store';
import { HouseCardModel } from '../models/house-card';

export const addFavorite = createAction('[Favorites] Add', props<{ house: HouseCardModel }>());
export const removeFavorite = createAction('[Favorites] Remove', props<{ houseId: string }>());
export const loadFavorites = createAction('[Favorites] Load');
export const loadFavoritesSuccess = createAction('[Favorites] Load Success', props<{ favorites: HouseCardModel[] }>());