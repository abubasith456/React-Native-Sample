import { createSlice } from '@reduxjs/toolkit'
import { LoginResponse } from '../../../model/LoginModel';
import { login } from '../../api/UserRepo';

interface Response {
    data: LoginResponse | null;
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

export const loginSlice = createSlice({
    name: 'login',
    initialState: initialState,
    reducers: {
        resetState: () => initialState,
    },
    extraReducers: builder => {
        builder.addCase(login.pending, (state, action) => {
            state.isLoader = true;
            state.isError = false;
            state.data = null;
        });
        builder.addCase(login.fulfilled, (state, action) => {
            if (action.payload.status == 200) {
                state.isLoader = false;
                state.data = action.payload;
                state.isError = false;
            } else {
                console.log('$))))))))))')
                state.isLoader = false;
                state.isError = true;
                state.data = null;
                state.errorMessage = action.payload.message
            }
        });
        builder.addCase(login.rejected, (state, action) => {
            state.isLoader = false;
            state.isError = true;
            state.errorMessage = action.payload as string || 'Something went wrong';
        });
    },

});

export const { resetState } = loginSlice.actions;
export default loginSlice.reducer;