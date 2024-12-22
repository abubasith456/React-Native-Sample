import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchProducts } from '../../api/UserRepo';


const initialState = {
  products: [],
  filteredProducts: [],
  loading: false,
};

const productsSlice = createSlice({
  name: 'productSearch',
  initialState,
  reducers: {
    // Action to filter products based on search query
    filterProducts: (state, action) => {
      const searchQuery = action.payload?.toLowerCase()?.trim();
      if (!searchQuery) {
        state.filteredProducts = []
        return;
      }
      const data = state.products.filter((product) => {
        if (!product || typeof product.name !== "string") {
          console.log("Invalid product structure:", product);
          return false;
        }
        const trimmedQuery = searchQuery.trim().toLowerCase();
        const resultData = product.name.toLowerCase().includes(trimmedQuery);
        return resultData;
      });
      console.log(" Filtered => ", data)
      state.filteredProducts = data
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.filteredProducts = []
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { filterProducts } = productsSlice.actions;

export default productsSlice.reducer;