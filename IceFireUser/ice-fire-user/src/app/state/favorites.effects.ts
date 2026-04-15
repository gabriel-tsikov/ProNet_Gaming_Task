import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as FavoritesActions from './favorites.actions';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class FavoritesEffects {
  loadFavorites$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FavoritesActions.loadFavorites),
      switchMap(() => {
        // Load from localStorage or API
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        return of(FavoritesActions.loadFavoritesSuccess({ favorites }));
      })
    )
  );

  constructor(private actions$: Actions) {}
}