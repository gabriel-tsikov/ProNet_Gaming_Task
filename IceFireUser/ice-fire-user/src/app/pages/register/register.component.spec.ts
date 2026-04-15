import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { register } from '../../state/auth.actions';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../../services/auth.service';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let store: MockStore;
  let dispatchSpy: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RegisterComponent, 
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        provideMockStore(),
        AuthService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    dispatchSpy = spyOn(store, 'dispatch');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an invalid form when empty', () => {
    expect(component.registerForm.valid).toBeFalse();
  });

  it('should have a valid form when filled and passwords match', () => {
    component.registerForm.setValue({ username: 'user', password: 'pass', confirmPassword: 'pass' });
    expect(component.registerForm.valid).toBeTrue();
  });

  it('should not dispatch register if passwords do not match', () => {
    component.registerForm.setValue({ username: 'user', password: 'pass', confirmPassword: 'fail' });
    component.onSubmit();
    expect(dispatchSpy).not.toHaveBeenCalled();
  });

  it('should dispatch register action on submit if form is valid', () => {
    component.registerForm.setValue({ username: 'user', password: 'pass', confirmPassword: 'pass' });
    component.onSubmit();
    expect(dispatchSpy).toHaveBeenCalledWith(register({ username: 'user', password: 'pass' }));
  });
});