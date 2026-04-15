import { housesReducer, initialState } from './houses.reducer';
import * as HousesActions from './houses.actions';
import { HouseCardModel } from '../models/house-card';

describe('Houses Reducer', () => {
  const mockHouse: HouseCardModel = {
    url: 'house/1',
    name: 'House Stark',
    region: 'The North',
    coatOfArms: 'Direwolf'
  };

  it('should return initial state', () => {
    const action = { type: 'NOOP' } as any;
    const state = housesReducer(undefined, action);
    expect(state).toBe(initialState);
  });

  it('should set loading to true when loading houses', () => {
    const action = HousesActions.loadHouses({ page: 1, size: 10 });
    const state = housesReducer(initialState, action);
    expect(state.loading).toBe(true);
  });

  it('should update houses on successful load', () => {
    const houses = [mockHouse];
    const action = HousesActions.loadHousesSuccess({ data: houses, total: 1, page: 1, pageSize: 10 });
    const state = housesReducer(initialState, action);
    expect(state.houses).toEqual(houses);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(null);
  });

  it('should set error on load failure', () => {
    const error = 'Failed to load houses';
    const action = HousesActions.loadHousesFailure({ error });
    const state = housesReducer(initialState, action);
    expect(state.error).toBe(error);
    expect(state.loading).toBe(false);
    expect(state.houses).toEqual([]);
  });
}); 