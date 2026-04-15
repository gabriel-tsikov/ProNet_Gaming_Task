import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { AuthEffects } from './auth.effects';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { cold, hot } from 'jasmine-marbles';
import * as AuthActions from './auth.actions';

describe('AuthEffects', () => {
  let actions$: Observable<any>;
  let effects: AuthEffects;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['login', 'register']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        AuthEffects,
        provideMockActions(() => actions$),
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    });

    effects = TestBed.inject(AuthEffects);
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  describe('login$', () => {
    it('should handle successful login', () => {
      const credentials = { username: 'test', password: 'test' };
      const user = { id: 1, username: 'test' };

      const action = AuthActions.login(credentials);
      const completion = AuthActions.loginSuccess({ user });

      actions$ = hot('-a', { a: action });
      const response = cold('-b', { b: user });
      authService.login.and.returnValue(response);

      const expected = cold('--b', { b: completion });
      expect(effects.login$).toBeObservable(expected);
    });

    it('should handle login failure', () => {
      const credentials = { username: 'test', password: 'wrong' };
      const error = 'Invalid credentials';

      const action = AuthActions.login(credentials);
      const completion = AuthActions.loginFailure({ error });

      actions$ = hot('-a', { a: action });
      const response = cold('-#', {}, error);
      authService.login.and.returnValue(response);

      const expected = cold('--b', { b: completion });
      expect(effects.login$).toBeObservable(expected);
    });
  });

  describe('register$', () => {
    it('should handle successful registration', () => {
      const credentials = { username: 'test', password: 'test' };
      const user = { id: 1, username: 'test' };

      const action = AuthActions.register(credentials);
      const completion = AuthActions.registerSuccess({ user });

      actions$ = hot('-a', { a: action });
      const response = cold('-b', { b: user });
      authService.register.and.returnValue(response);

      const expected = cold('--b', { b: completion });
      expect(effects.register$).toBeObservable(expected);
    });

    it('should handle registration failure', () => {
      const credentials = { username: 'taken', password: 'test' };
      const error = 'Username already taken';

      const action = AuthActions.register(credentials);
      const completion = AuthActions.registerFailure({ error });

      actions$ = hot('-a', { a: action });
      const response = cold('-#', {}, error);
      authService.register.and.returnValue(response);

      const expected = cold('--b', { b: completion });
      expect(effects.register$).toBeObservable(expected);
    });
  });

  describe('loginSuccessRedirect$', () => {
    it('should navigate to home on login success', () => {
      const user = { id: 1, username: 'test' };
      const action = AuthActions.loginSuccess({ user });

      actions$ = hot('-a', { a: action });
      effects.loginSuccessRedirect$.subscribe(() => {
        expect(router.navigate).toHaveBeenCalledWith(['/']);
      });
    });
  });

  describe('registerSuccessRedirect$', () => {
    it('should navigate to home on register success', () => {
      const user = { id: 1, username: 'test' };
      const action = AuthActions.registerSuccess({ user });

      actions$ = hot('-a', { a: action });
      effects.registerSuccessRedirect$.subscribe(() => {
        expect(router.navigate).toHaveBeenCalledWith(['/']);
      });
    });
  });
}); 