// cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

export type CartItem = {
    id: number;
    name: string;
    price: number;
    image: string;
    quantity: number;
};

type CartState = {
    items: CartItem[]; // Use the CartItem type here
};

const initialState: CartState = {
    items: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action) => {
            const item = action.payload;
            state.items.push(item);
        },
        removeItem: (state, action) => {
            const itemId = action.payload;
            state.items = state.items.filter((item) => item.id !== itemId);
        },
        clearCart: (state) => {
            state.items = [];
        },
    },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
