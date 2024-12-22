import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchProfile, updateProfile } from "../../api/UserRepo";

interface Profile {
    _id: string;
    dateOfBirth: string;
    email: string;
    mobileNumber: string;
    profilePic: string;
    role: string;
    unique_id: number;
    updatedAt: string;
    pushToken: string;
    token: string;
    username: string
}

interface ProfileState {
    data: Profile | null;
    loading: boolean;
    error: boolean;
    errorMessage: string | null;
    updateError: string | null;
}

const initialState: ProfileState = {
    data: null,
    loading: false,
    error: false,
    errorMessage: null,
    updateError: null
};


const profileSlice = createSlice({
    name: 'profileApi',
    initialState: initialState,
    reducers: {
        resetState: () => initialState,
    },
    extraReducers: builder => {
        builder
            .addCase(fetchProfile.pending, (state, action) => {
                state.loading = true; //State fetching data
            })
            .addCase(fetchProfile.fulfilled, (state, action) => {
                console.log("fetchProfile fillFiled => " + action.payload);
                if (action.payload.status == 200) {
                    state.data = action.payload.data;
                    state.loading = false;
                } else {
                    state.loading = false;
                    state.error = true
                }
            })
            .addCase(fetchProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                const errorMessage = action.error.message?.toString();
                state.errorMessage = errorMessage ? errorMessage : "Something went wrong!"
            })
            .addCase(updateProfile.pending, (state, action) => {
                console.log("updateProfile fillFiled => " + action.payload);
                state.loading = true;
                state.updateError = null
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                console.log("updateProfile filled => ", action.payload);
                if (action.payload.status == 200) {
                    state.data = action.payload.data;
                    state.loading = false;
                    state.updateError = null
                } else {
                    console.log("--------> ", action.payload.message)
                    state.loading = false;
                    state.error = true
                    state.updateError = action.payload.message;
                }
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                const errorMessage = action.error.message?.toString();
                state.updateError = errorMessage ? errorMessage : "Something went wrong!"
            })
    }
});


export default profileSlice.reducer;


