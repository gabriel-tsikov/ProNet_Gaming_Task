import * as fromAuth from './auth.reducer';
import * as AuthSelectors from './auth.selectors';

describe('Auth Selectors', () => {
  const initialState: fromAuth.AuthState = {
    user: null,
    loading: false,
    error: null
  };

  describe('selectUser', () => {
    it('should select null when no user', () => {
      const state = { auth: initialState };
      const result = AuthSelectors.selectUser(state);
      expect(result).toBeNull();
    });

    it('should select user when logged in', () => {
      const user = { id: 1, username: 'test' };
      const state = { auth: { ...initialState, user } };
      const result = AuthSelectors.selectUser(state);
      expect(result).toBe(user);
    });
  });

  describe('selectAuthLoading', () => {
    it('should select loading state', () => {
      const state = { auth: { ...initialState, loading: true } };
      const result = AuthSelectors.selectAuthLoading(state);
      expect(result).toBe(true);
    });
  });

  describe('selectAuthError', () => {
    it('should select null when no error', () => {
      const state = { auth: initialState };
      const result = AuthSelectors.selectAuthError(state);
      expect(result).toBeNull();
    });

    it('should select error when present', () => {
      const error = 'Invalid credentials';
      const state = { auth: { ...initialState, error } };
      const result = AuthSelectors.selectAuthError(state);
      expect(result).toBe(error);
    });
  });
}); 