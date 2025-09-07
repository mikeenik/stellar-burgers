import { RootState } from './root-reducer';

export const getIngredients = (state: RootState) =>
  state.ingredients.ingredients;
export const getIngredientsLoading = (state: RootState) =>
  state.ingredients.isLoading;
export const getIngredientsError = (state: RootState) =>
  state.ingredients.error;

export const getConstructorBun = (state: RootState) => state.constructor.bun;
export const getConstructorIngredients = (state: RootState) =>
  state.constructor.ingredients;

export const getOrderRequest = (state: RootState) => state.order.orderRequest;
export const getOrderModalData = (state: RootState) =>
  state.order.orderModalData;
export const getCurrentOrder = (state: RootState) => state.order.currentOrder;
export const getOrderError = (state: RootState) => state.order.error;

export const getFeedOrders = (state: RootState) => state.feed.orders;
export const getFeedTotal = (state: RootState) => state.feed.total;
export const getFeedTotalToday = (state: RootState) => state.feed.totalToday;
export const getFeedLoading = (state: RootState) => state.feed.isLoading;
export const getFeedError = (state: RootState) => state.feed.error;
export const getFeedData = (state: RootState) => ({
  orders: state.feed.orders,
  total: state.feed.total,
  totalToday: state.feed.totalToday
});

export const getUser = (state: RootState) => state.auth.user;
export const getIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;
export const getAuthLoading = (state: RootState) => state.auth.isLoading;
export const getAuthError = (state: RootState) => state.auth.error;

export const getUserOrders = (state: RootState) => state.userOrders.orders;
export const getUserOrdersLoading = (state: RootState) =>
  state.userOrders.isLoading;
export const getUserOrdersError = (state: RootState) => state.userOrders.error;
