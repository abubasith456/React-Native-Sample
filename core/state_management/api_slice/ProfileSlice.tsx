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
    profileData: Profile | null;
    loading: boolean;
    error: boolean;
    errorMessage: string | null;
    updateError: string | null;
    dialog: { visible: boolean, message: string, type: 'error' | 'info' | 'success' };
}

const initialState: ProfileState = {
    profileData: null,
    loading: false,
    error: false,
    errorMessage: null,
    updateError: null,
    dialog: { visible: false, message: '', type: 'info' },
};


const profileSlice = createSlice({
    name: 'profileApi',
    initialState: initialState,
    reducers: {
        resetState: (state) => {
            state.loading = false;
            state.errorMessage = null;
            state.updateError = null;
            state.dialog = { visible: false, message: '', type: 'info' }
        },
        updateProfilePictureLocally: (state, action: PayloadAction<string>) => {
            if (state.profileData) {
                state.profileData.profilePic = action.payload;
            }
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchProfile.pending, (state, action) => {
                state.loading = true; //State fetching data
            })
            .addCase(fetchProfile.fulfilled, (state, action) => {
                console.log("fetchProfile fillFiled => " + action.payload);
                if (action.payload.status == 200) {
                    state.profileData = action.payload.data;
                    state.loading = false;
                    state.error = false
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
                console.log("updating...=> " + action.payload);
                state.loading = true;
                state.updateError = null
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                console.log("updateProfile filled => ", action.payload);
                state.loading = false;
                state.error = false
                state.dialog.message = action.payload.message
                if (!!action.payload.data) {
                    state.profileData = action.payload.data;
                    state.dialog.visible = true
                } else {
                    console.log("Error --------> ", action.payload.message)
                    state.dialog.visible = true
                }
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                const errorMessage = action.error.message?.toString();
                state.dialog.visible = true
                state.dialog.message = errorMessage ? errorMessage : "Something went wrong!"
            })
    }
});

export const { resetState, updateProfilePictureLocally } = profileSlice.actions;

export default profileSlice.reducer;


