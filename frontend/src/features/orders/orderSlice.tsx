import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {fetchOrders} from "./orderAPI";

export enum Statuses {
    Initial = "Not fetched",
    Loading = "Loading...",
    UpToDate = "Up to date",
    Deleted = "Deleted",
    Error = "Error",
}

export interface OrderState {
    id?: number;
    country?: string;
    status?: string;
    state?: string;
    name?: string;
    fullAddress?: string;
    total?: string
    note?: string;
    created_at?: string;
    nickname?: string;
}

export interface OrdersState {
    orders: OrderState[];
    status: Statuses;
}

const initialState: OrdersState = {
    orders: [
        {
            id: 0,
            country: "",
            status: "pending",
        },
    ],
    status: Statuses.Initial,
}

export const fetchOrdersAsync = createAsyncThunk(
    "orders/fetchOrders",
    async () => await fetchOrders()
);

export const orderSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrdersAsync.pending, (state) => {
                state.status = Statuses.Loading;
            })
            .addCase(fetchOrdersAsync.fulfilled, (state, action) => {
                state.orders = action.payload;
                state.status = Statuses.UpToDate;
            })
            .addCase(fetchOrdersAsync.rejected, (state) => {
                state.status = Statuses.Error;
            })
    },
});

export const {} = orderSlice.actions;

export const selectOrders = (state: RootState) => state.orders.orders;
export const selectStatus = (state: RootState) => state.orders.status;

export default orderSlice.reducer;
