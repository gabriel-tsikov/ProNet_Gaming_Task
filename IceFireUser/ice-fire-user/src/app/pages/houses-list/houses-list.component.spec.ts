import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HousesListComponent } from './houses-list.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { addFavorite, removeFavorite } from '../../state/favorites.actions';
import { HouseCardModel } from '../../models/house-card';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HousesService } from '../../services/houses.service';

describe('HousesListComponent', () => {
  let component: HousesListComponent;
  let fixture: ComponentFixture<HousesListComponent>;
  let store: MockStore;
  let dispatchSpy: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HousesListComponent, 
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        provideMockStore({
          initialState: {
            favorites: { favorites: [] },
            houses: { houses: [], loading: false, error: null }
          }
        }),
        HousesService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HousesListComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    dispatchSpy = spyOn(store, 'dispatch');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch addFavorite if not already favorite', () => {
    const house: HouseCardModel = { url: '1', name: 'Stark', region: '', coatOfArms: '' };
    component.toggleFavorite(house, []);
    expect(dispatchSpy).toHaveBeenCalledWith(addFavorite({ house }));
  });

  it('should dispatch removeFavorite if already favorite', () => {
    const house: HouseCardModel = { url: '1', name: 'Stark', region: '', coatOfArms: '' };
    component.toggleFavorite(house, [house]);
    expect(dispatchSpy).toHaveBeenCalledWith(removeFavorite({ houseId: house.url }));
  });
});