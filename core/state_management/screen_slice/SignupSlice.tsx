import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    name: { value: '', error: '' },
    email: { value: '', error: '' },
    mobileNumber: { value: '', error: '' },
    password: { value: '', error: '' },
    showPassword: false,
    dateOfBirth: '',
    registrationType: 'email', // default type
    showDatePicker: false
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
    tapShowDatePicker

} = signUpSlice.actions;

export default signUpSlice.reducer;
