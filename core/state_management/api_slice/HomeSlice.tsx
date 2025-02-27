import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HomeResponse } from "../../../model/HomeModel";
import { fetchHome } from "../../api/UserRepo";

interface HomeState {
    data: HomeResponse | null;
    loading: boolean;
    error: boolean;
    errorMessage: string | null;
}

const initialState: HomeState = {
    data: null,
    loading: true,
    error: false,
    errorMessage: null
};

const homeSlice = createSlice({
    name: 'homeApi',
    initialState: initialState,
    reducers: {
        resetState: () => initialState
    },
    extraReducers: builder => {
        builder
            .addCase(fetchHome.pending, (state, action) => {
                state.error = false
                state.loading = true;
            })
            .addCase(fetchHome.fulfilled, (state, action) => {
                if (action.payload.success) {
                    state.data = action.payload;
                    state.loading = false;
                } else {
                    state.loading = false;
                    state.error = true
                }
            })
            .addCase(fetchHome.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                const errorMessage = action.error.message?.toString();
                state.errorMessage = errorMessage ? errorMessage : "Something went wrong!"
            });
    }
});

export default homeSlice.reducer;