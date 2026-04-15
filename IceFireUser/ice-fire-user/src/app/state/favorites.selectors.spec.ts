import * as fromFavorites from './favorites.reducer';
import * as FavoritesSelectors from './favorites.selectors';
import { HouseCardModel } from '../models/house-card';

describe('Favorites Selectors', () => {
  const mockHouse: HouseCardModel = {
    url: 'house/1',
    name: 'House Stark',
    region: 'The North',
    coatOfArms: 'Direwolf'
  };

  const initialState: fromFavorites.FavoritesState = {
    favorites: []
  };

  describe('selectFavorites', () => {
    it('should select empty array when no favorites', () => {
      const state = { favorites: initialState };
      const result = FavoritesSelectors.selectFavorites(state);
      expect(result).toEqual([]);
    });

    it('should select favorites when present', () => {
      const favorites = [mockHouse];
      const state = { favorites: { ...initialState, favorites } };
      const result = FavoritesSelectors.selectFavorites(state);
      expect(result).toEqual(favorites);
    });
  });
}); 