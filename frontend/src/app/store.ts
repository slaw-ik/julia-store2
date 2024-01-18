import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import ordersReducer from '../features/orders/ordersSlice';
import orderReducer from '../features/orders/orderSlice';
export const store = configureStore({
    reducer: {
        orders: ordersReducer,
        order: orderReducer,
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
