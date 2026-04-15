import * as AuthActions from './auth.actions';

describe('Auth Actions', () => {
  it('should create login action', () => {
    const payload = { username: 'test', password: 'test' };
    const action = AuthActions.login(payload);
    expect(action.type).toBe('[Auth] Login');
    expect(action.username).toBe('test');
    expect(action.password).toBe('test');
  });

  it('should create loginSuccess action', () => {
    const user = { id: 1, username: 'test' };
    const action = AuthActions.loginSuccess({ user });
    expect(action.type).toBe('[Auth] Login Success');
    expect(action.user).toEqual(user);
  });

  it('should create loginFailure action', () => {
    const error = 'Invalid credentials';
    const action = AuthActions.loginFailure({ error });
    expect(action.type).toBe('[Auth] Login Failure');
    expect(action.error).toBe(error);
  });

  it('should create register action', () => {
    const payload = { username: 'test', password: 'test' };
    const action = AuthActions.register(payload);
    expect(action.type).toBe('[Auth] Register');
    expect(action.username).toBe('test');
    expect(action.password).toBe('test');
  });

  it('should create registerSuccess action', () => {
    const user = { id: 1, username: 'test' };
    const action = AuthActions.registerSuccess({ user });
    expect(action.type).toBe('[Auth] Register Success');
    expect(action.user).toEqual(user);
  });

  it('should create registerFailure action', () => {
    const error = 'Username taken';
    const action = AuthActions.registerFailure({ error });
    expect(action.type).toBe('[Auth] Register Failure');
    expect(action.error).toBe(error);
  });

  it('should create logout action', () => {
    const action = AuthActions.logout();
    expect(action.type).toBe('[Auth] Logout');
  });
}); 