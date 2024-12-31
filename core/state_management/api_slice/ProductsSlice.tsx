import { createSlice } from '@reduxjs/toolkit'
import { Product } from '../../../model/ProductModel';
import { fetchProducts } from '../../api/ProductRepo';

export interface ProductsResponse {
    success: boolean;
    data: Product[]
}

interface Response {
    data: ProductsResponse | null;
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

export const productsSlice = createSlice({
    name: 'productsSlice',
    initialState: initialState,
    reducers: {
        resetState: () => initialState,
    },
    extraReducers: builder => {
        builder.addCase(fetchProducts.pending, (state, action) => {
            state.isLoader = true;
            state.isError = false;
            state.data = null;
        });
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            console.log(" addCase called => ")
            if (action.payload.success) {
                state.isLoader = false;
                state.data = action.payload;
                state.isError = false;
            } else {
                state.isLoader = false;
                state.isError = true;
                state.data = null;
                state.errorMessage = action.payload.message
            }
        });
        builder.addCase(fetchProducts.rejected, (state, action) => {
            state.isLoader = false;
            state.isError = true;
            state.errorMessage = action.payload as string || 'Something went wrong';
        });
    }
});

export const { resetState } = productsSlice.actions;
export default productsSlice.reducer;