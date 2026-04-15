import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HousesService } from '../services/houses.service';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { loadHouses, loadHousesFailure, loadHousesSuccess } from './houses.actions';

@Injectable()
export class HousesEffects {
  loadHouses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadHouses),
      switchMap(({ page, size }) =>
        this.housesService.getHouses(page, size).pipe(
          map(res =>
            loadHousesSuccess({
              data: res.data,
              total: res.totalItems,
              page: res.page,
              pageSize: res.pageSize
            })
          ),
          catchError(error =>
            of(loadHousesFailure({ error }))
          )
        )
      )
    )
  );

  constructor(private actions$: Actions, private housesService: HousesService) { }
}