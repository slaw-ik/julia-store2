import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import ordersReducer from '../features/orders/ordersSlice';
import orderReducer from '../features/orders/orderSlice';
import clientsReducer from '../features/clients/clientsSlice';
import clientReducer from '../features/clients/clientSlice';
import itemsReducer from '../features/items/itemsSlice';
import itemReducer from '../features/items/itemSlice';

export const store = configureStore({
  reducer: {
    orders: ordersReducer,
    order: orderReducer,
    clients: clientsReducer,
    client: clientReducer,
    items: itemsReducer,
    item: itemReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
