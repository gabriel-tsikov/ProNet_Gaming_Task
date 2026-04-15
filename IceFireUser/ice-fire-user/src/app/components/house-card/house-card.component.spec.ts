import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HouseCardComponent } from './house-card.component';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';

describe('HouseCard', () => {
  let component: HouseCardComponent;
  let fixture: ComponentFixture<HouseCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HouseCardComponent,
        RouterTestingModule
      ],
      providers: [
        provideMockStore({ initialState: {} })
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HouseCardComponent);
    component = fixture.componentInstance;
    component.house = { url: '1', name: 'Stark', region: 'North', coatOfArms: 'Direwolf' };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
