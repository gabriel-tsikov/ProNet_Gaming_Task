import * as fromHouses from './houses.reducer';
import * as HousesSelectors from './houses.selectors';
import { HouseCardModel } from '../models/house-card';

describe('Houses Selectors', () => {
  const mockHouse: HouseCardModel = {
    url: 'house/1',
    name: 'House Stark',
    region: 'The North',
    coatOfArms: 'Direwolf'
  };

  const initialState: fromHouses.HousesState = {
    houses: [],
    loading: false,
    error: null,
    totalItems: 0
  };

  describe('selectHouses', () => {
    it('should select empty array when no houses', () => {
      const state = { houses: initialState };
      const result = HousesSelectors.selectHouses(state);
      expect(result).toEqual([]);
    });

    it('should select houses when present', () => {
      const houses = [mockHouse];
      const state = { houses: { ...initialState, houses } };
      const result = HousesSelectors.selectHouses(state);
      expect(result).toEqual(houses);
    });
  });

  describe('selectHousesLoading', () => {
    it('should select loading state', () => {
      const state = { houses: { ...initialState, loading: true } };
      const result = HousesSelectors.selectHousesLoading(state);
      expect(result).toBe(true);
    });
  });

  describe('selectHousesError', () => {
    it('should select null when no error', () => {
      const state = { houses: initialState };
      const result = HousesSelectors.selectHousesError(state);
      expect(result).toBeNull();
    });

    it('should select error when present', () => {
      const error = 'Failed to load houses';
      const state = { houses: { ...initialState, error } };
      const result = HousesSelectors.selectHousesError(state);
      expect(result).toBe(error);
    });
  });

  // ✅ NEW TEST
  describe('selectTotalItems', () => {
    it('should select totalItems', () => {
      const state = { houses: { ...initialState, totalItems: 123 } };
      const result = HousesSelectors.selectTotalItems(state);
      expect(result).toBe(123);
    });
  });
});