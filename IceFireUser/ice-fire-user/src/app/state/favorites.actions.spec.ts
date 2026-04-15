import * as FavoritesActions from './favorites.actions';
import { HouseCardModel } from '../models/house-card';

describe('Favorites Actions', () => {
  const mockHouse: HouseCardModel = {
    url: 'house/1',
    name: 'House Stark',
    region: 'The North',
    coatOfArms: 'Direwolf'
  };

  it('should create addFavorite action', () => {
    const action = FavoritesActions.addFavorite({ house: mockHouse });
    expect(action.type).toBe('[Favorites] Add');
    expect(action.house).toEqual(mockHouse);
  });

  it('should create removeFavorite action', () => {
    const action = FavoritesActions.removeFavorite({ houseId: mockHouse.url });
    expect(action.type).toBe('[Favorites] Remove');
    expect(action.houseId).toBe(mockHouse.url);
  });

  it('should create loadFavorites action', () => {
    const action = FavoritesActions.loadFavorites();
    expect(action.type).toBe('[Favorites] Load');
  });

  it('should create loadFavoritesSuccess action', () => {
    const favorites = [mockHouse];
    const action = FavoritesActions.loadFavoritesSuccess({ favorites });
    expect(action.type).toBe('[Favorites] Load Success');
    expect(action.favorites).toEqual(favorites);
  });
}); 