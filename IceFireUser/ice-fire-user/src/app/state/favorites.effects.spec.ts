import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { FavoritesEffects } from './favorites.effects';
import { cold, hot } from 'jasmine-marbles';
import * as FavoritesActions from './favorites.actions';
import { HouseCardModel } from '../models/house-card';

describe('FavoritesEffects', () => {
  let actions$: Observable<any>;
  let effects: FavoritesEffects;

  const mockHouse: HouseCardModel = {
    url: 'house/1',
    name: 'House Stark',
    region: 'The North',
    coatOfArms: 'Direwolf'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FavoritesEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(FavoritesEffects);
  });

  describe('loadFavorites$', () => {
    it('should load favorites from localStorage', () => {
      const favorites = [mockHouse];
      spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(favorites));

      const action = FavoritesActions.loadFavorites();
      const completion = FavoritesActions.loadFavoritesSuccess({ favorites });

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(effects.loadFavorites$).toBeObservable(expected);
    });

    it('should handle empty localStorage', () => {
      spyOn(localStorage, 'getItem').and.returnValue(null);

      const action = FavoritesActions.loadFavorites();
      const completion = FavoritesActions.loadFavoritesSuccess({ favorites: [] });

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });
      expect(effects.loadFavorites$).toBeObservable(expected);
    });
  });
}); 