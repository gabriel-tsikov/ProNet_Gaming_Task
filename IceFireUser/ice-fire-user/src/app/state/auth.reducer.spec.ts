import { authReducer, initialState } from './auth.reducer';
import * as AuthActions from './auth.actions';

describe('Auth Reducer', () => {
  it('should return initial state', () => {
    const action = { type: 'NOOP' } as any;
    const state = authReducer(undefined, action);
    expect(state).toBe(initialState);
  });

  describe('login actions', () => {
    it('should set loading to true on login', () => {
      const action = AuthActions.login({ username: 'test', password: 'test' });
      const state = authReducer(initialState, action);
      expect(state.loading).toBe(true);
      expect(state.error).toBe(null);
    });

    it('should set user and loading to false on login success', () => {
      const user = { id: 1, username: 'test' };
      const action = AuthActions.loginSuccess({ user });
      const state = authReducer(initialState, action);
      expect(state.user).toBe(user);
      expect(state.loading).toBe(false);
      expect(state.error).toBe(null);
    });

    it('should set error and loading to false on login failure', () => {
      const error = 'Invalid credentials';
      const action = AuthActions.loginFailure({ error });
      const state = authReducer(initialState, action);
      expect(state.error).toBe(error);
      expect(state.loading).toBe(false);
      expect(state.user).toBe(null);
    });
  });

  describe('register actions', () => {
    it('should set loading to true on register', () => {
      const action = AuthActions.register({ username: 'test', password: 'test' });
      const state = authReducer(initialState, action);
      expect(state.loading).toBe(true);
      expect(state.error).toBe(null);
    });

    it('should set user and loading to false on register success', () => {
      const user = { id: 1, username: 'test' };
      const action = AuthActions.registerSuccess({ user });
      const state = authReducer(initialState, action);
      expect(state.user).toBe(user);
      expect(state.loading).toBe(false);
      expect(state.error).toBe(null);
    });

    it('should set error and loading to false on register failure', () => {
      const error = 'Username taken';
      const action = AuthActions.registerFailure({ error });
      const state = authReducer(initialState, action);
      expect(state.error).toBe(error);
      expect(state.loading).toBe(false);
      expect(state.user).toBe(null);
    });
  });

  describe('logout action', () => {
    it('should clear user on logout', () => {
      // First set a user
      const user = { id: 1, username: 'test' };
      let state = authReducer(initialState, AuthActions.loginSuccess({ user }));
      
      // Then logout
      state = authReducer(state, AuthActions.logout());
      expect(state.user).toBe(null);
      expect(state.loading).toBe(false);
      expect(state.error).toBe(null);
    });
  });
}); 