import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchProfile } from "../../api/UserRepo";

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
}

interface ProfileState {
    data: Profile | null;
    loading: boolean;
    error: boolean;
    errorMessage: string | null;
}

const initialState: ProfileState = {
    data: null,
    loading: false,
    error: false,
    errorMessage: null
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
                console.log("fulfilled => " + action.payload);
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
            });
    }
});


export default profileSlice.reducer;


