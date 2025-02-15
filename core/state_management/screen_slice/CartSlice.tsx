import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CartItem } from "../../../model/CartItemModel";  // Ensure correct import

interface CartState {
    items: CartItem[];
}

const initialState: CartState = {
    items: [],
};

// Save to AsyncStorage
const saveCartToStorage = async (cartItems: CartItem[]) => {
    try {
        await AsyncStorage.setItem("cart", JSON.stringify(cartItems));
        console.log("Cart added!...");
    } catch (error) {
        console.error("Error saving cart data:", error);
    }
};

// Load from AsyncStorage
export const loadCartFromStorage = async (): Promise<CartItem[]> => {
    try {
        const storedCart = await AsyncStorage.getItem("cart");
        console.log("Cart loaded!...");
        return storedCart ? JSON.parse(storedCart) : [];
    } catch (error) {
        console.error("Error loading cart data:", error);
        return [];
    }
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setCart: (state, action: PayloadAction<CartItem[]>) => {
            state.items = action.payload;
        },
        addItem: (state, action: PayloadAction<CartItem>) => {
            const existingItem = state.items.find((item) => item.id === action.payload.id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push(action.payload);
            }
            saveCartToStorage(state.items);
        },
        updateQuantity: (state, action: PayloadAction<{ id: number; type: "increase" | "decrease" }>) => {
            const item = state.items.find((item) => item.id === action.payload.id);
            if (item) {
                item.quantity = action.payload.type === "increase" ? item.quantity + 1 : Math.max(1, item.quantity - 1);
            }
            saveCartToStorage(state.items);
        },
        removeItem: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter((item) => item.id !== action.payload);
            saveCartToStorage(state.items);
        },
    },
});

export const { addItem, updateQuantity, removeItem, setCart } = cartSlice.actions;
export default cartSlice.reducer;
