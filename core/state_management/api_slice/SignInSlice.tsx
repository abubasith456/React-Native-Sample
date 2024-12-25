import { createSlice } from '@reduxjs/toolkit'

import { register } from '../../api/UserRepo';
import { SignUpResponse } from '../../../model/SignUpModel';

interface Response {
    data: SignUpResponse | null;
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

export const registerSlice = createSlice({
    name: 'register',
    initialState: initialState,
    reducers: {
        resetState: () => initialState,
    },
    extraReducers: builder => {
        builder.addCase(register.pending, (state, action) => {
            state.isLoader = true;
            state.isError = false;
            state.data = null;
        });
        builder.addCase(register.fulfilled, (state, action) => {
            if (action.payload.status == 200) {
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
        builder.addCase(register.rejected, (state, action) => {
            state.isLoader = false;
            state.isError = true;
            state.data = null;
            state.errorMessage = action.payload as string || 'Something went wrong';
        });
    },

});

export const { resetState } = registerSlice.actions;
export default registerSlice.reducer;