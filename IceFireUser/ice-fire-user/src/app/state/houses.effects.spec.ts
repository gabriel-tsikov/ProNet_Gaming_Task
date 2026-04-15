import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { HousesEffects } from './houses.effects';
import { HousesService } from '../services/houses.service';
import { cold, hot } from 'jasmine-marbles';
import * as HousesActions from './houses.actions';
import { HouseCardModel } from '../models/house-card';

describe('HousesEffects', () => {
  let actions$: Observable<any>;
  let effects: HousesEffects;
  let housesService: jasmine.SpyObj<HousesService>;

  const mockHouse: HouseCardModel = {
    url: 'house/1',
    name: 'House Stark',
    region: 'The North',
    coatOfArms: 'Direwolf'
  };

  const mockPagedResponse: PagedResponse<HouseCardModel> = {
    data: [mockHouse],
    totalItems: 1,
    page: 1,
    pageSize: 10
  };

  beforeEach(() => {
    const housesServiceSpy = jasmine.createSpyObj('HousesService', ['getHouses']);

    TestBed.configureTestingModule({
      providers: [
        HousesEffects,
        provideMockActions(() => actions$),
        { provide: HousesService, useValue: housesServiceSpy }
      ]
    });

    effects = TestBed.inject(HousesEffects);
    housesService = TestBed.inject(HousesService) as jasmine.SpyObj<HousesService>;
  });

  describe('loadHouses$', () => {
    it('should handle successful houses load', () => {
      const houses = [mockHouse];
      const action = HousesActions.loadHouses({ page: 1, size: 10 });
      const completion = HousesActions.loadHousesSuccess({ data: houses, total: mockPagedResponse.totalItems, page: mockPagedResponse.page, pageSize: mockPagedResponse.pageSize });

      actions$ = hot('-a', { a: action });
      const response = cold('-b', { b: mockPagedResponse });
      housesService.getHouses.and.returnValue(response);

      const expected = cold('--b', { b: completion });
      expect(effects.loadHouses$).toBeObservable(expected);
    });

    it('should handle houses load failure', () => {
      const action = HousesActions.loadHouses({ page: 1, size: 10 });
      const error = 'Failed to load houses';
      const completion = HousesActions.loadHousesFailure({ error });

      actions$ = hot('-a', { a: action });
      const response = cold('-#', {}, error);
      housesService.getHouses.and.returnValue(response);

      const expected = cold('--b', { b: completion });
      expect(effects.loadHouses$).toBeObservable(expected);
    });
  });
}); 