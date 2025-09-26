import { expect, test, describe } from '@jest/globals';
import feedReducer from './feed-slice';
import { fetchFeeds } from './feed-slice';
import { TOrder } from '../../utils/types';

const mockOrder: TOrder = {
  _id: '1',
  status: 'done',
  name: 'Test Order',
  createdAt: '2023-01-01T00:00:00.000Z',
  updatedAt: '2023-01-01T00:00:00.000Z',
  number: 12345,
  ingredients: ['1', '2']
};

const mockFeedsData = {
  orders: [mockOrder],
  total: 1,
  totalToday: 1
};

describe('feed slice', () => {
  const initialState = {
    orders: [],
    total: 0,
    totalToday: 0,
    isLoading: false,
    error: null
  };

  test('should return the initial state', () => {
    expect(feedReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });


  test('should handle fetchFeeds.pending', () => {
    const action = { type: fetchFeeds.pending.type };
    expect(feedReducer(initialState, action)).toEqual({
      ...initialState,
      isLoading: true,
      error: null
    });
  });

  test('should handle fetchFeeds.fulfilled', () => {
    const action = { type: fetchFeeds.fulfilled.type, payload: mockFeedsData };
    expect(feedReducer(initialState, action)).toEqual({
      ...initialState,
      isLoading: false,
      orders: mockFeedsData.orders,
      total: mockFeedsData.total,
      totalToday: mockFeedsData.totalToday,
      error: null
    });
  });

  test('should handle fetchFeeds.rejected', () => {
    const action = { type: fetchFeeds.rejected.type, payload: 'Fetch failed' };
    expect(feedReducer(initialState, action)).toEqual({
      ...initialState,
      isLoading: false,
      error: 'Fetch failed'
    });
  });
});
