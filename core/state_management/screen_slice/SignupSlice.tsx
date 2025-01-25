import { createSlice } from '@reduxjs/toolkit';

interface LoginScreenState {
    name: { value: string, error: string };
    email: { value: string, error: string };
    mobileNumber: { value: string, error: string }
    password: { value: string, error: string };
    showPassword: boolean;
    dateOfBirth: { value: string, error: string };
    registrationType: string;
    showDatePicker: boolean;
    dialog: { visible: boolean, message: string, type: 'error' | 'info' | 'success' };
}

const initialState: LoginScreenState = {
    name: { value: '', error: '' },
    email: { value: '', error: '' },
    mobileNumber: { value: '', error: '' },
    password: { value: '', error: '' },
    showPassword: false,
    dateOfBirth: { value: '', error: '' },
    registrationType: 'email', // default type
    showDatePicker: false,
    dialog: { visible: false, message: '', type: 'info' },
};

const signUpSlice = createSlice({
    name: 'signUp',
    initialState,
    reducers: {
        setName: (state, action) => {
            state.name = action.payload;
        },
        setEmail: (state, action) => {
            state.email = action.payload;
        },
        setMobileNumber: (state, action) => {
            state.mobileNumber = action.payload;
        },
        setPassword: (state, action) => {
            state.password = action.payload;
        },
        toggleShowPassword: (state) => {
            state.showPassword = !state.showPassword;
        },
        setDateOfBirth: (state, action) => {
            state.dateOfBirth = action.payload;
        },
        setRegistrationType: (state, action) => {
            state.registrationType = action.payload;
        },
        tapShowDatePicker: (state, action) => {
            console.log('Reducer called with payload:', action.payload);
            state.showDatePicker = action.payload;
            console.log('Updated showDatePicker:', state.showDatePicker);
        },
        showDialog(state, action) {
            state.dialog = action.payload;
        }
    },
});



export const {
    setName,
    setEmail,
    setMobileNumber,
    setPassword,
    setDateOfBirth,
    setRegistrationType,
    toggleShowPassword,
    tapShowDatePicker,
    showDialog
} = signUpSlice.actions;

export default signUpSlice.reducer;
