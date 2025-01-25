import { createSlice } from '@reduxjs/toolkit';


interface LoginScreenState {
    email: { value: string, error: string };
    password: { value: string, error: string };
    showPassword: boolean;
    dialog: { visible: boolean, message: string, type: 'error' | 'info' | 'success' };
}

const initialState: LoginScreenState = {
    email: { value: '', error: '' },
    password: { value: '', error: '' },
    showPassword: false,
    dialog: { visible: false, message: '', type: 'info' },
};

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setEmail: (state, action) => {
            state.email = action.payload;
        },
        setPassword: (state, action) => {
            state.password = action.payload;
        },
        toggleShowPassword: (state) => {
            state.showPassword = !state.showPassword;
        },
        showDialog(state, action) {
            state.dialog = action.payload;
        },
        resetForm(state) {
            state.email = { value: '', error: '' };
            state.password = { value: '', error: '' };
            state.showPassword = false;
        },
    },
});

export const { setEmail, setPassword, toggleShowPassword, resetForm, showDialog } = loginSlice.actions;
export default loginSlice.reducer;
