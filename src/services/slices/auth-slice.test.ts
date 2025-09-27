import { expect, test, describe } from '@jest/globals';
import authReducer, { clearError, setUser, clearUser } from './auth-slice';
import { loginUser, registerUser, getUser, updateUser, logoutUser, checkAuth } from './auth-slice';
import { TUser } from '../../utils/types';

const mockUser: TUser = {
  email: 'test@example.com',
  name: 'Test User'
};

describe('auth slice', () => {

  test('should return the initial state', () => {
    expect(authReducer(undefined, { type: 'unknown' })).toEqual({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null
    });
  });

  test('should handle clearError', () => {
    const state = { user: null, isAuthenticated: false, isLoading: false, error: 'Some error' };
    expect(authReducer(state, clearError())).toEqual({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null
    });
  });

  test('should handle setUser', () => {
    expect(authReducer(undefined, setUser(mockUser))).toEqual({
      user: mockUser,
      isAuthenticated: true,
      isLoading: false,
      error: null
    });
  });

  test('should handle clearUser', () => {
    const state = { user: mockUser, isAuthenticated: true, isLoading: false, error: null };
    expect(authReducer(state, clearUser())).toEqual({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null
    });
  });

  test('should handle loginUser.pending', () => {
    const action = { type: loginUser.pending.type };
    expect(authReducer(undefined, action)).toEqual({
      user: null,
      isAuthenticated: false,
      isLoading: true,
      error: null
    });
  });

  test('should handle loginUser.fulfilled', () => {
    const action = { type: loginUser.fulfilled.type, payload: mockUser };
    expect(authReducer(undefined, action)).toEqual({
      user: mockUser,
      isAuthenticated: true,
      isLoading: false,
      error: null
    });
  });

  test('should handle loginUser.rejected', () => {
    const action = { type: loginUser.rejected.type, payload: 'Login failed' };
    expect(authReducer(undefined, action)).toEqual({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: 'Login failed'
    });
  });
});
