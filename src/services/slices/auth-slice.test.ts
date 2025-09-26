import { expect, test, describe } from '@jest/globals';
import authReducer, { clearError, setUser, clearUser } from './auth-slice';
import { loginUser, registerUser, getUser, updateUser, logoutUser, checkAuth } from './auth-slice';
import { TUser } from '../../utils/types';

const mockUser: TUser = {
  email: 'test@example.com',
  name: 'Test User'
};

describe('auth slice', () => {
  const initialState = {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null
  };

  test('should return the initial state', () => {
    expect(authReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  test('should handle clearError', () => {
    const state = { ...initialState, error: 'Some error' };
    expect(authReducer(state, clearError())).toEqual({
      ...state,
      error: null
    });
  });

  test('should handle setUser', () => {
    expect(authReducer(initialState, setUser(mockUser))).toEqual({
      ...initialState,
      user: mockUser,
      isAuthenticated: true
    });
  });

  test('should handle clearUser', () => {
    const state = { ...initialState, user: mockUser, isAuthenticated: true };
    expect(authReducer(state, clearUser())).toEqual({
      ...state,
      user: null,
      isAuthenticated: false
    });
  });

  test('should handle loginUser.pending', () => {
    const action = { type: loginUser.pending.type };
    expect(authReducer(initialState, action)).toEqual({
      ...initialState,
      isLoading: true,
      error: null
    });
  });

  test('should handle loginUser.fulfilled', () => {
    const action = { type: loginUser.fulfilled.type, payload: mockUser };
    expect(authReducer(initialState, action)).toEqual({
      ...initialState,
      isLoading: false,
      user: mockUser,
      isAuthenticated: true,
      error: null
    });
  });

  test('should handle loginUser.rejected', () => {
    const action = { type: loginUser.rejected.type, payload: 'Login failed' };
    expect(authReducer(initialState, action)).toEqual({
      ...initialState,
      isLoading: false,
      error: 'Login failed',
      isAuthenticated: false
    });
  });
});
