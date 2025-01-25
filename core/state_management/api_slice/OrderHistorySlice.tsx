import { createSlice } from "@reduxjs/toolkit";
import { Order, OrderResponse } from "../../../model/OrderModel";
import { fetchOrderHistory } from "../../api/ProductRepo";


interface Response {
    data: Order[] | null;
    isLoader: boolean;
    isError: boolean;
    errorMessage: string;
}

const initialState: Response = {
    data: null,
    isLoader: false,
    isError: false,
    errorMessage: ''
}

export const orderhistorySlice = createSlice({
    name: 'orderHistorySlice',
    initialState: initialState,
    reducers: {
        resetState: () => initialState,
    },
    extraReducers: builder => {
        builder.addCase(fetchOrderHistory.pending, (state, action) => {
            state.isLoader = true;
            state.isError = false;
            state.data = null;
        });
        builder.addCase(fetchOrderHistory.fulfilled, (state, action) => {
            if (action.payload.status == 200) {
                state.isLoader = false;
                state.data = action.payload.message;
                state.isError = false;
            } else {
                state.isLoader = false;
                state.isError = true;
                state.data = null;
                state.errorMessage = action.payload.message
            }
        });
        builder.addCase(fetchOrderHistory.rejected, (state, action) => {
            state.isLoader = false;
            state.isError = true;
            state.errorMessage = action.payload as string || 'Something went wrong';
        });
    },

});

export const { resetState } = orderhistorySlice.actions;
export default orderhistorySlice.reducer;