import { createAction, props } from '@ngrx/store';
import { HouseCardModel } from '../models/house-card';

export const loadHouses = createAction(
  '[Houses] Load',
  props<{ page: number; size: number }>()
);

export const loadHousesSuccess = createAction(
  '[Houses] Load Houses Success',
  props<{
    data: HouseCardModel[];
    total: number;
    page: number;
    pageSize: number;
  }>()
);

export const loadHousesFailure = createAction(
  '[Houses] Load Failure',
  props<{ error: any }>()
);