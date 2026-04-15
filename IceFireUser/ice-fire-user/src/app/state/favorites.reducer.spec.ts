import { favoritesReducer, initialState } from './favorites.reducer';
import * as FavoritesActions from './favorites.actions';
import { HouseCardModel } from '../models/house-card';

describe('Favorites Reducer', () => {
  const mockHouse: HouseCardModel = {
    url: 'house/1',
    name: 'House Stark',
    region: 'The North',
    coatOfArms: 'Direwolf'
  };

  it('should return initial state', () => {
    const action = { type: 'NOOP' } as any;
    const state = favoritesReducer(undefined, action);
    expect(state).toBe(initialState);
  });

  it('should add favorite', () => {
    const action = FavoritesActions.addFavorite({ house: mockHouse });
    const state = favoritesReducer(initialState, action);
    expect(state.favorites).toContain(mockHouse);
    expect(state.favorites.length).toBe(1);
  });

  it('should remove favorite', () => {
    // First add a favorite
    let state = favoritesReducer(initialState, FavoritesActions.addFavorite({ house: mockHouse }));
    
    // Then remove it
    const action = FavoritesActions.removeFavorite({ houseId: mockHouse.url });
    state = favoritesReducer(state, action);
    expect(state.favorites).not.toContain(mockHouse);
    expect(state.favorites.length).toBe(0);
  });

  it('should load favorites', () => {
    const favorites = [mockHouse];
    const action = FavoritesActions.loadFavoritesSuccess({ favorites });
    const state = favoritesReducer(initialState, action);
    expect(state.favorites).toEqual(favorites);
  });

  it('should not add duplicate favorites', () => {
    // Add the same house twice
    let state = favoritesReducer(initialState, FavoritesActions.addFavorite({ house: mockHouse }));
    state = favoritesReducer(state, FavoritesActions.addFavorite({ house: mockHouse }));
    
    expect(state.favorites.length).toBe(1);
    expect(state.favorites[0]).toEqual(mockHouse);
  });
}); 