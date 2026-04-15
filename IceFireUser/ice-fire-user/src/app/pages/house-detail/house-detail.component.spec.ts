import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HouseDetailComponent } from './house-detail.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { HousesService } from '../../services/houses.service';

describe('HouseDetail', () => {
  let component: HouseDetailComponent;
  let fixture: ComponentFixture<HouseDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HouseDetailComponent,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        provideMockStore({ initialState: {} }),
        HousesService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HouseDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
